const urlParse = require('url').parse;
const Tags = require('./tracer_tags');

function tagsForResponse(tracer, span, response) {
  const statusCode = response.statusCode;
  span.setTag(Tags.HTTP_STATUS_CODE, statusCode);
  if (response.error || statusCode >= 500) {
    span.setTag(Tags.ERROR, true);
  }
  // 'method' is set here, because certain call patterns
  // of request (e.g. calling through an alias such as
  // 'request.get' make it difficult to know before
  // the request is made.
  if (response.req) {
    span.setTag(Tags.HTTP_METHOD, response.req.method);
  }
}

// Given a tracer, return a function that is capable of
// wrapping outgoing calls to 'request.js' in tracing spans.
module.exports = function requestWrapper(tracer) {
  /** Wrap an outgoing call to request.js in a child span,
  * @param {Object} spanOpts - (optional) Options for the created span
  * @param {Object} spanOpts.operation - Operation name for the created span; by default we use the pathname,
  * this is useful to use a route instead or a more static name in case the path includes some random id
  * or something like that
  * @param {Object} spanOpts.spanTags - Additional tags to apply to the created span.
  * @param {Object} spanOpts.parentSpan - A parent span, if any.
  * @param {function} target - The target function (e.g. 'request', or 'request.get').
  */
  return function(spanOpts, target) {
    const spanOptions = {};
    if (typeof spanOpts === 'function') {
      target = spanOpts;
    } else {
      Object.assign(spanOptions, spanOpts);
    }
    return function(uri, options, callback) {
      if (typeof options === 'function') {
        callback = options;
      }
      const params = {};
      if (typeof options === 'object') {
        Object.assign(params, options, { uri: uri });
      } else if (typeof uri === 'string') {
        Object.assign(params, {uri: uri});
      } else {
        Object.assign(params, uri);
      }
      // request permits 'url' as a synonym for 'uri'.
      const parsed = urlParse(params.uri || params.url);
      const span = tracer.startSpan(spanOptions.operation || parsed.pathname, { childOf: spanOptions.parentSpan });
      span.setTag(Tags.SPAN_KIND, Tags.SPAN_KIND_RPC_CLIENT);
      span.setTag(Tags.HTTP_URL, parsed.href);
      if (spanOptions.spanTags) {
        span.addTags(spanOptions.spanTags);
      }
      params.callback = callback || params.callback;
      params.headers = params.headers || {};
      tracer.inject(span, tracer.FORMAT_HTTP_HEADERS, params.headers);

      if (!params.callback) {
        // stream response.
        return target(params)
          .once('response', (response) => {
            tagsForResponse(tracer, span, response);
            span.finish();
          })
          .once('error', () => {
            span.setTag(Tags.ERROR, true);
            span.finish();
          });
      }
      // callback response.
      const originalCallback = params.callback;
      params.callback = function(error, response, body) {
        if (error) {
          span.setTag(Tags.ERROR, true);
        }
        if (response) {
          tagsForResponse(tracer, span, response);
        }
        span.finish();
        originalCallback(error, response, body);
      };
      return target(params);
    };
  };
};
