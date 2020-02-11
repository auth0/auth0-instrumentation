const onFinished = require('on-finished');
const reqIdHelpers = require('./req_id_helpers');
const Tags = require('./tracer_tags');

// createRequestSpan creates a new Span for an incoming request.
function createRequestSpan(tracer, req, options) {
  const wireCtx = tracer.extract(tracer.FORMAT_HTTP_HEADERS, req.headers);
  // Placeholder, gets overriden before shipping the first span
  const name = 'http.request';

  const tags = {};
  if (options.sli) {
    tags.sli = true;
  }

  const span = tracer.startSpan(name, {
    childOf: wireCtx,
    tags
  });
  span.setTag(Tags.HTTP_METHOD, req.method);
  span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_SERVER);

  reqIdHelpers.forwardReqIdsToSpan(req, span);

  // This ain't available on creation, but its on response (either framework)
  // span.setTag(tracer.Tags.HTTP_URL, req.url.href ? req.url.href : req.url);
  return span;
}

function hapiHelper(tracer, options) {
  options = options || {};

  const h = {tracer: tracer};
  h.decorateRequest = (req) => {
    const span = createRequestSpan(h.tracer, req, options);
    return {
      span: span,
      tracer: tracer
    };
  };

  h.onPreAuth = (req) => {
    req.a0trace.auth = tracer.startSpan('auth', { childOf: req.a0trace.span });
  };

  h.onPostAuth = (req) => {
    req.a0trace.auth.setTag('auth.isAuthenticated', req.auth.isAuthenticated);
    req.a0trace.auth.setTag('auth.mode', req.auth.mode);
    req.a0trace.auth.finish();
    req.a0trace.auth = null;
  };

  h.onPreHandler = (req) => {
    req.a0trace.handler = h.tracer.startSpan('handler', { childOf: req.a0trace.span });
  };

  h.onPreResponse = (req) => {
    // We may not have an active handler span, since it's possible
    // to skip directly to the response step if routing fails.
    // See: https://hapijs.com/api/16.6.2#request-lifecycle
    if (req.a0trace.handler) {
      req.a0trace.handler.finish();
      req.a0trace.handler = null;
    }
    const response = req.response;
    const statusCode = response.isBoom ? response.output.statusCode : response.statusCode;

    // set operation name before closing primary span to used parse route name
    if (req.route && req.route.path) {
      req.a0trace.span.setOperationName(req.route.path);
    }
    // set final request status on the primary span.
    req.a0trace.span.setTag(Tags.HTTP_PATH, req.route.path);
    req.a0trace.span.setTag(Tags.HTTP_STATUS_CODE, statusCode);
    if (statusCode >= 500) {
      req.a0trace.span.setTag(Tags.ERROR, true);
      req.a0trace.span.setTag(Tags.SAMPLING_PRIORITY, 1);
    }

    // Inject headers for the request span into the response, for debugging.
    const responseHeaders = {};
    tracer.inject(req.a0trace.span, tracer.FORMAT_TEXT_MAP, responseHeaders);
    if (response.isBoom) {
      Object.keys(responseHeaders).forEach((key) => {
        response.output.headers[key] = responseHeaders[key];
      });
    } else {
      Object.keys(responseHeaders).forEach((key) => {
        response.header(key, responseHeaders[key]);
      });
    }

    // will be automatically finished by the response event.
    req.a0trace.response = tracer.startSpan('response', { childOf: req.a0trace.span });
  };

  h.finishSpans = (req) => {
    if (req && req.a0trace) {
      for (const key of Object.keys(req.a0trace)) {
        const span = req.a0trace[key];
        if (span && span.finish) {
          span.finish();
        }
      }
    }
  };
  return h;
}

module.exports = {
  express: function(tracer, options) {
    options = options || {};

    const mw = (req, res, next) => {
      const span = createRequestSpan(tracer, req, options);

      // Include the trace context in response headers, to facilitate debugging.
      const responseHeaders = {};
      tracer.inject(span, tracer.FORMAT_TEXT_MAP, responseHeaders);
      Object.keys(responseHeaders).forEach((key) => { res.setHeader(key, responseHeaders[key]); });


      // Assigns the span for use by the request.
      req.a0trace = {
        span: span
      };

      onFinished(res, (err, res) => {
        if (res) {
          span.setTag(Tags.HTTP_STATUS_CODE, res.statusCode);

          if (res.req) {
            if (res.req.url) {
              span.setTag(Tags.HTTP_URL, req.url.href ? req.url.href : req.url);
            }

            if (res.req.path) {
              span.setTag(Tags.HTTP_PATH, res.req.path);
            } else {
              span.setTag(Tags.HTTP_PATH, 'unknown_path');
            }

            if (res.req.route) {
              span.setOperationName(res.req.route.path);
            } else {
              // No matching route
              span.setOperationName('http.request.invalid_route');
            }
          }
        }
        if (err || (res && res.statusCode >= 500)) {
          span.setTag(Tags.ERROR, true);
          span.setTag(Tags.SAMPLING_PRIORITY, 1);
        }
        span.finish();
      });

      next();
    };

    // Allow wrapping of existing middlware.
    mw.wrap = (name, target) => {
      const wrapped = (req, res, next) => {
        const parentCtx = req.a0trace ? req.a0trace.span : undefined;
        const span = tracer.startSpan(name, { childOf: parentCtx });

        // There are 3 ways that a middleware can complete:
        //  - calling next() (optionally with a value)
        //  - Throwing an exception
        //  - sending (and finishing) a response.
        //  We need to call span.finish() in each of these cases, but
        //  there is nothing in the opentracing spec that defines the
        //  behavior on multiple calls to finish.

        var finished = false;
        const finish = (tags) => {
          if (!finished) {
            finished = true;
            if (tags) {
              span.addTags(tags);
            }
            span.finish();
          }
        };

        const wrappedNext = function() {
          finish({'finished.by': 'next'});
          return next.apply(null, arguments);
        };

        onFinished(res, (err, _res) => {
          const tags = {'finished.by': 'response'};
          if (err) {
            tags[Tags.ERROR] = true;
            tags[Tags.SAMPLING_PRIORITY] = 1;
          }
          finish(tags);
        });

        try {
          target(req, res, wrappedNext);
        } catch (err) {
          const tags = {'finished.by': 'error'};
          tags[Tags.ERROR] = true;
          tags[Tags.SAMPLING_PRIORITY] = 1;
          finish(tags);
          throw err;
        }
      };
      return wrapped;
    };

    return mw;
  },

  hapi16: function(tracer, options) {

    const helper = hapiHelper(tracer, options);

    const register = function(server, options, next) {
      server.decorate('request', 'a0trace',  helper.decorateRequest, { apply: true });

      server.ext('onPreAuth', (req, reply) => {
        helper.onPreAuth(req);
        reply.continue();
      });

      server.ext('onPostAuth', (req, reply) => {
        helper.onPostAuth(req);
        reply.continue();
      });

      server.ext('onPreHandler', (req, reply) => {
        helper.onPreHandler(req);
        reply.continue();
      });

      server.ext('onPreResponse', (req, reply) => {
        helper.onPreResponse(req);
        reply.continue();
      });

      server.on('response', helper.finishSpans);
      next();
    };

    register.attributes = {
      name: 'a0trace'
    };

    return register;
  },

  hapi17: function(tracer, options) {
    const plugin = {
      name: 'a0trace',
      version: '1.0.0',
    };
    const helper = hapiHelper(tracer, options);

    plugin.register = function(server) {
      server.decorate('request', 'a0trace', helper.decorateRequest, { apply: true, once: true });

      server.ext('onPreAuth', (req, reply) => {
        helper.onPreAuth(req);
        return reply.continue;
      });

      server.ext('onPostAuth', (req, reply) => {
        helper.onPostAuth(req);
        return reply.continue;
      });

      server.ext('onPreHandler', (req, reply) => {
        helper.onPreHandler(req);
        return reply.continue;
      });

      server.ext('onPreResponse', (req, reply) => {
        helper.onPreResponse(req);
        return reply.continue;
      });

      server.events.on('response', helper.finishSpans);
    };
    return plugin;
  }
};
