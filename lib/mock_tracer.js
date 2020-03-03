const opentracing = require('opentracing');
const _ = require('lodash');

// This is useful for integration tests
module.exports = function() {
  tracer = new opentracing.MockTracer();
  tracer._baggageItems = {};

  const superAllockSpan = tracer._allocSpan;
  tracer._allocSpan = function () {
    const span = superAllockSpan();

    span._baggageItems = {};
    span._setBaggageItem = function (k, v) { this._baggageItems[k] = v; };
    span._getBaggageItem = function (k) { return this._baggageItems[k]; };
    span.getBaggageItems = function () { return this._baggageItems; };

    span.addReference = function (ref) {
      const refContext = ref.referencedContext();
      const parentSpan = refContext && refContext.span && ref.referencedContext().span();

      if (parentSpan) {
        // If there is a parent let's copy baggageItems from parent
        this._baggageItems = parentSpan._baggageItems;
      }
    };

    return span;
  };

  tracer._inject = function inject(span, format, carrier) {
    span = span._span || span;
    if (typeof carrier === 'object' && (format === opentracing.FORMAT_HTTP_HEADERS || format === opentracing.FORMAT_TEXT_MAP)) {
      carrier['ot-mock-tracer'] = span.uuid();
      carrier['ot-mock-operation'] = span.operationName();

      _.forEach(span._baggageItems, (value, key) => {
        carrier[`ot-mock-baggage-${key}`] = value;
      });
    }
  };

  tracer._extract = function extract(format, carrier) {
    if (typeof carrier === 'object' && (format === opentracing.FORMAT_HTTP_HEADERS || format === opentracing.FORMAT_TEXT_MAP)) {
      const span = tracer.startSpan(carrier['ot-mock-operation']);
      span._uuid = carrier['ot-mock-tracer'];

      _.forEach(carrier, (value, key) => {
        if (key.indexOf('ot-mock-baggage-') === 0) {
          span.setBaggageItem(key.replace('ot-mock-baggage-', ''), value);
        }
      });

      return span;
    }
  };

  return tracer;
};
