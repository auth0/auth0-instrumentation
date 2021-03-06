const stubs = require('./lib/stubs');
const Logger = require('./lib/logger');
const ErrorReporter = require('./lib/error_reporter');
const Metrics = require('./lib/metrics');
const Profiler = require('./lib/profiler');
const Tracer = require('./lib/tracer');
const reqIdHelpers = require('./lib/req_id_helpers');
const buildDecorateNodeback = require('./lib/decorate_nodeback_helper');
const tracerUtils = require('./lib/tracer_utils');
const requestHelper = require('./lib/trace_request');
const middleware = require('./lib/tracer_middleware');
const opentracing = require('opentracing');

/**
 * @typedef {Object} InstrumentationParams
 *
 * @property {function} isTracerEnabled Determines whether tracer is enabled and allows
 * to dynamically turn it on / off (e.g. using a flag)
 * @property {function} isEnabled Deprecated: same as `isTracerEnabled`, use `isTracerEnabled`
 * instead
 * @property {string} fileRotationSignal Process signal to use to rotate the log file
 */

module.exports = {
  logger: stubs.logger,
  errorReporter: stubs.errorReporter,
  metrics: stubs.metrics,
  profiler: stubs.profiler,
  tracer: stubs.tracer,
  initialized: false,

  helpers: {
    reqIdHelpers,

    tracingHelpers: (tracer) => {
      return {
        middleware: {
          express: middleware.express(tracer),
          hapi16: middleware.hapi16(tracer),
          hapi17: middleware.hapi17(tracer)
        },

        wrapRequest: requestHelper(tracer),

        decorateNodeback: buildDecorateNodeback(tracer),

        mapToTags: tracerUtils.mapToTags
      };
    }
  },

  /**
   * Initialize the instrumentation agent
   *
   * @param {Object} pkg Package configuration in general taken from package.jsons
   * @param {Object} env Environment configuration for instrumentation
   * @param {Object} serializers Logger serializers
   * @param {InstrumentationParams} params Instrumentation parametrs
   * @param {Object} [params.errorReporter]
   * @param {boolean} params.errorReporter.splitEnvironmentByReleaseChannel Whether to send
   * environmentName + releaseChannel to sentry instead of just environmentName
   */
  init: function(pkg, env, serializers, params) {
    if (this.initialized) { return; }

    const errorReporter = ErrorReporter(pkg, env, {
      splitEnvironmentByReleaseChannel: params && params.errorReporter && params.errorReporter.splitEnvironmentByReleaseChannel
    });

    this.errorReporter = errorReporter;
    this.logger = Logger(pkg, env, serializers, null, errorReporter);
    this.metrics = Metrics(pkg, env);
    // creates an additional instance of metrics using the same configuration
    // EXCEPT there is no metrics prefix.
    // This should be minimal/no operational overhead since UDP is connectionless.
    this.metrics.std = Metrics(pkg,
      Object.assign({}, env, {METRICS_PREFIX: ''})
    );

    this.profiler = new Profiler(this, pkg, env);
    const tracer = Tracer(this, pkg, env, {
      // Using params.isEnabled should be consider legacy since it is a bit
      // misleading because it only applies to tracing
      isEnabled: params && (params.isTracerEnabled || params.isEnabled),
      logger: this.logger,
      metrics: this.metrics.std,
      slis: params && params.slis
    });
    opentracing.initGlobalTracer(tracer);
    this.tracer = tracer;
    this.initialized = true;

    if (params && params.fileRotationSignal && env.LOG_FILE) {
      process.on(params.fileRotationSignal, () => {
        this.logger.reopenFileStreams();
        this.logger.info('The log file has been rotated.');
      });
    }
  }
};
