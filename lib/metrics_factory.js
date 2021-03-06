const url = require('url');
const StatsD = require('node-statsd');
const datadog = require('datadog-metrics');
const DatadogClientToStatsdAdapter = require('./datadog_client_to_statsd_adapter');
const dgram = require('dgram');
const nodeMajor = parseInt(process.version.match(/^v([0-9]+)\./)[1], 10);
const utils = require('./utils');


function buildStatsD(pkg, env) {
  const parsedURL = url.parse(env.STATSD_HOST);
  let host = parsedURL.hostname;
  let cacheDNS = true;
  if (parsedURL.hostname === 'localhost' || parsedURL.hostname === '127.0.0.1') {
    host = null;
    cacheDNS = false;
  }

  let client = new StatsD({
    host: host,
    port: Number(parsedURL.port),
    prefix: utils.buildMetricPrefix(env, pkg),
    cacheDns: true
  });

  // Monkeypatch the dns.lookup function for socket.send calls when statsd server is on localhost
  // and node runtime version is v6.x.
  // Newer versions support user provided lookup functions when creating a socket `dgram.createSocket`
  // https://nodejs.org/docs/latest-v8.x/api/dgram.html#dgram_dgram_createsocket_options_callback
  // Without this patch, every single statsd metric (caused by underlying dgram.send) results
  // in a DNS lookup to resolve localhost/127.0.0.1
  if (nodeMajor == 6 && host === null) {
    client.socket._handle.lookup = function() {
      const cb = arguments[arguments.length -1];
      cb(null, '127.0.0.1', 4);
    };
  } else if (nodeMajor >= 8 && host == null) {
    client.socket = dgram.createSocket({
      type: 'udp4',
      lookup: function() {
        const cb = arguments[arguments.length -1];
        cb(null, '127.0.0.1', 4);
      }
    });

  }
  return client;
}

function buildDataDog(pkg, env) {
  const dd = new datadog.BufferedMetricsLogger({
    apiKey: env.METRICS_API_KEY,
    host: env.METRICS_HOST || require('os').hostname(),
    prefix: utils.buildMetricPrefix(env, pkg),
    flushIntervalSeconds: env.METRICS_FLUSH_INTERVAL || 15
  });

  return new DatadogClientToStatsdAdapter(dd);
}

exports.create = (pkg, env) => {
  var client;

  if (env.STATSD_HOST) {
    client = buildStatsD(pkg, env);
    client.socket.on('error', function noop() {});
  } else if (env.METRICS_API_KEY) {
    client = buildDataDog(pkg, env);
  }

  return client;
};

module.exports = exports;

