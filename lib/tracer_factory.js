const stubs = require('./stubs');
const constants = require('./constants');
const buildSwitchableTracer = require('./switchable_tracer');
const o11y = require('@a0/observability-nodejs');

exports.create = (agent, pkg, env, params) => {
  params = params || {};

  let tracer = stubs.tracer;

  const serviceName = env.SERVICE_NAME || pkg.name;
  if (env.TRACE_AGENT_CLIENT === constants.TRACER_JAEGER) {
    const jaegerClient = require('jaeger-client');

    const config = {
      serviceName: serviceName,
      reporter: {
        agentHost: env.TRACE_AGENT_HOST,
        agentPort: env.TRACE_AGENT_PORT,
      },
      sampler: {
        type: 'const',
        param: 1,
      }
    };
    const options = { logger: agent.logger };

    tracer = jaegerClient.initTracer(config, options);
  }
  if (env.TRACE_AGENT_CLIENT === constants.TRACER_LIGHTSTEP) {
    const lightstepClient = require('lightstep-tracer');
    const config = {
      access_token: env.TRACE_AGENT_API_KEY,
      collector_host: env.TRACE_AGENT_HOST,
      collector_port: env.TRACE_AGENT_PORT,
      collector_encryption: env.TRACE_AGENT_USE_TLS ? 'tls' : 'none',
      component_name: serviceName,
      max_reporting_interval_millis: env.TRACE_REPORTING_INTERVAL_MILLIS || 500,
      // 5 results in 5 * max_reporting_interval_millis + jitter of full buffer = max(~5) seconds before flush
      clear_span_buffer_consecutive_errors: env.LS_CLEAR_SPAN_BUFFER_AFTER_NUM_ERRORS || 5,
      max_span_records: env.LS_MAX_SPAN_RECORDS || 4096,
    };
    tracer = new lightstepClient.Tracer(config);
  }
  if (env.TRACE_AGENT_CLIENT === constants.TRACER_MOCK) {
    const buildMockTracer = require('./mock_tracer');
    tracer = buildMockTracer();
  }

  if (typeof params.slis === 'object') {
    const logger = params.logger && typeof params.logger.child === 'function' ?
      params.logger.child({ library: "@a0/observability-nodejs" }) :
      params.logger;

    tracer = new o11y.tracing.MultiTracer({
      primaryTracer: tracer, // This is the base tracer
      additionalTracers: [
        new o11y.slis.tracing.Tracer({
          metrics: params.metrics,
          logger: logger,
          operationsToTrack: params.slis.operationsToTrack
        })
      ]
    });
  }

  if (typeof params.isEnabled === 'function') {
    tracer = buildSwitchableTracer({
      baseTracer: tracer, // This is the base tracer
      tracerStubs: stubs.tracer,
      isEnabled: params.isEnabled,
      logger: params.logger
    });
  }

  return tracer;
};
