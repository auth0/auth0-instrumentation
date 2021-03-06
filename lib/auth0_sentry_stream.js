'use strict';

const omit = require('lodash.omit');

// // //

const TAGS_WHITELIST = [
  'log_type',
  'region',
  'environment',
  'channel',
  'feature'
];

/**
 * Auth0-specific Sentry stream for Bunyan, forked from https://github.com/transcovo/bunyan-sentry-stream/blob/bf4a9d2262b7854aff6eb757b45565abc664e103/lib/SentryStream.js.
 */
class Auth0SentryStream {

  /**
   * Auth0SentryStream constructor
   * @param  {Object} client the Sentry client
   * @return {void}
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Method call by Bunyan to save log record
   * @param  {Object} record log properties
   * @return {Boolean}        true
   */
  write(record) {
    const err = record.err;
    const tags = record.tags || { };
    const level = this.getSentryLevel(record);

    TAGS_WHITELIST.forEach((tag) => {
      if (record[tag]) {
        tags[tag] = record[tag];
      }
    });

    if (err && level !== 'info') {
      const extra = omit(record, 'err', 'tags');
      this.client.captureException(this.deserializeError(err), { extra, level, tags });
    } else {
      const extra = omit(record, 'msg', 'tags');
      this.client.captureMessage(record.msg, { extra, level, tags });
    }
    return (true);
  }

  /**
   * Convert Bunyan level number to Sentry level label.
   * Rule : >50=error ; 40=warning ; info otherwise
   * @param  {Object} record Bunyan log record
   * @return {String}        Sentry level
   */
  getSentryLevel(record) {
    const level = record.level;

    if (level >= 50) return 'error';
    if (level === 40) return 'warning';

    return 'info';
  }

  /**
   * Error deserialiazing function. Bunyan serialize the error to object : https://github.com/trentm/node-bunyan/blob/master/lib/bunyan.js#L1089
   * @param  {object} data serialized Bunyan
   * @return {Error}      the deserialiazed error
   */
  deserializeError(data) {
    if (data instanceof Error) return data;

    const error = new Error(data.message);
    error.name = data.name;
    error.stack = data.stack;
    error.code = data.code;
    error.signal = data.signal;
    return error;
  }
}

/**
 * Default module function
 * @param  {Object} client Sentry client
 * @param  {String} level Bunyan level
 * @return {Object}        Bunyan stream with embedded Sentry steam
 */
function defaultSetup(client, level) {
  return {
    stream: new Auth0SentryStream(client),
    type: 'raw',
    level: level || 'warn'
  };
}

module.exports = defaultSetup;
module.exports.Auth0SentryStream = Auth0SentryStream;
