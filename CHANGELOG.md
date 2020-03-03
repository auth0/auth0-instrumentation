## [3.12.4](https://github.com/auth0/auth0-instrumentation/compare/v3.12.3...v3.12.4) (2020-03-03)


### Bug Fixes

* baggage item propagation on the mock tracer ([#238](https://github.com/auth0/auth0-instrumentation/issues/238)) ([2addb4f](https://github.com/auth0/auth0-instrumentation/commit/2addb4fd139a46c5e9404dc1de09f6735150add9))

## [3.12.3](https://github.com/auth0/auth0-instrumentation/compare/v3.12.2...v3.12.3) (2020-03-02)


### Bug Fixes

* Add safeguard for request tagging ([#237](https://github.com/auth0/auth0-instrumentation/issues/237)) ([e7676ef](https://github.com/auth0/auth0-instrumentation/commit/e7676ef6e27824784f4f99e4178ff11e172f0790))

## [3.12.2](https://github.com/auth0/auth0-instrumentation/compare/v3.12.1...v3.12.2) (2020-02-11)


### Bug Fixes

* Avoid sending raw path for invalid routes as operation names ([#235](https://github.com/auth0/auth0-instrumentation/issues/235)) ([153e238](https://github.com/auth0/auth0-instrumentation/commit/153e23839f7b245ea3df1b71930321c6546113e1))

## [3.12.1](https://github.com/auth0/auth0-instrumentation/compare/v3.12.0...v3.12.1) (2020-02-10)


### Bug Fixes

* TS syntax errors ([#234](https://github.com/auth0/auth0-instrumentation/issues/234)) ([494923a](https://github.com/auth0/auth0-instrumentation/commit/494923ae8dcee0ae754a20ac75471a358149aa56))

# [3.12.0](https://github.com/auth0/auth0-instrumentation/compare/v3.11.0...v3.12.0) (2020-02-10)


### Features

* add TS typings ([#224](https://github.com/auth0/auth0-instrumentation/issues/224)) ([7cdcbbd](https://github.com/auth0/auth0-instrumentation/commit/7cdcbbdc1666f609f0f76d249cb4cbf5185ad98c))

# [3.11.0](https://github.com/auth0/auth0-instrumentation/compare/v3.10.0...v3.11.0) (2020-02-10)


### Features

* Support SLI tracer and configure opentracing global tracer ([#232](https://github.com/auth0/auth0-instrumentation/issues/232)) ([4efe450](https://github.com/auth0/auth0-instrumentation/commit/4efe4501ab0e3937f9af8b4d1c0fdb0ab777b327))

# [3.10.0](https://github.com/auth0/auth0-instrumentation/compare/v3.9.2...v3.10.0) (2020-02-07)


### Features

* Expose tracing helpers ([29bceb5](https://github.com/auth0/auth0-instrumentation/commit/29bceb517c45b43b1fe3e45fa627a33e909cfe4a)), closes [#231](https://github.com/auth0/auth0-instrumentation/issues/231)

## [3.9.2](https://github.com/auth0/auth0-instrumentation/compare/v3.9.1...v3.9.2) (2020-02-07)


### Bug Fixes

* Add support for extract, inject, and baggage items to the mock ([64b059a](https://github.com/auth0/auth0-instrumentation/commit/64b059a8e1ba841bb5fd65ff0d097df5ca3b8ca1)), closes [#230](https://github.com/auth0/auth0-instrumentation/issues/230)

## [3.9.1](https://github.com/auth0/auth0-instrumentation/compare/v3.9.0...v3.9.1) (2020-02-06)


### Bug Fixes

* missing dependency require on mock mode ([2cf1986](https://github.com/auth0/auth0-instrumentation/commit/2cf1986c5f0a967dbc6b035cec0ac3e3bdb18394)), closes [#229](https://github.com/auth0/auth0-instrumentation/issues/229)

# [3.9.0](https://github.com/auth0/auth0-instrumentation/compare/v3.8.1...v3.9.0) (2020-02-06)


### Features

* Fix req_id_helpers, support specifying operation name for request wrapper and support configuring mock tracer ([49b689e](https://github.com/auth0/auth0-instrumentation/commit/49b689e623c118b8580652aac604d2b51ad94626)), closes [#228](https://github.com/auth0/auth0-instrumentation/issues/228)

## [3.8.1](https://github.com/auth0/auth0-instrumentation/compare/v3.8.0...v3.8.1) (2020-01-30)


### Bug Fixes

* vuln issues ([#226](https://github.com/auth0/auth0-instrumentation/issues/226)) ([1643c9b](https://github.com/auth0/auth0-instrumentation/commit/1643c9b59ae85d0195414dbf61bfb8e91909750b))

# [3.8.0](https://github.com/auth0/auth0-instrumentation/compare/v3.7.0...v3.8.0) (2020-01-28)


### Features

* **logger:** schema debug stream ([#220](https://github.com/auth0/auth0-instrumentation/issues/220)) ([3faf0c0](https://github.com/auth0/auth0-instrumentation/commit/3faf0c0043f1df8066a557a022a3aba104ea0494)), closes [#SREPR-515](https://github.com/auth0/auth0-instrumentation/issues/SREPR-515)

# [3.7.0](https://github.com/auth0/auth0-instrumentation/compare/v3.6.0...v3.7.0) (2020-01-24)


### Features

* add request id helpers and implements baggageItems ([#218](https://github.com/auth0/auth0-instrumentation/issues/218)) ([06a6c1e](https://github.com/auth0/auth0-instrumentation/commit/06a6c1e9ab59d068e9c7251b061183b9c8981db7))

# [3.6.0](https://github.com/auth0/auth0-instrumentation/compare/v3.5.0...v3.6.0) (2020-01-07)


### Features

* Whitelist feature as error tag ([b3f8c21](https://github.com/auth0/auth0-instrumentation/commit/b3f8c21d79e9a6903403ea5f8a5bdca486f4f3f6)), closes [#215](https://github.com/auth0/auth0-instrumentation/issues/215)

# [3.5.0](https://github.com/auth0/auth0-instrumentation/compare/v3.4.0...v3.5.0) (2020-01-03)
- Whitelist "feature" to be used as tag in Sentry

# [3.4.0](https://github.com/auth0/auth0-instrumentation/compare/v3.3.0...v3.4.0) (2019-12-11)


### Features

* **profiler:** Enable GC stats by default ([779d36b](https://github.com/auth0/auth0-instrumentation/commit/779d36bf095a92d3d15440b8ca68955d369d5a22))

# [3.3.0](https://github.com/auth0/auth0-instrumentation/compare/v3.2.1...v3.3.0) (2019-12-09)


### Features

* **trace:** Nodeback decorator accepts tracer to `startSpan` on ([eb872f4](https://github.com/auth0/auth0-instrumentation/commit/eb872f48669ff7d08fc41b53d32414464fa9148e))

## [3.2.1](https://github.com/auth0/auth0-instrumentation/compare/v3.2.0...v3.2.1) (2019-12-06)


### Bug Fixes

* **dep:** removed hapi as installed dependency ([#211](https://github.com/auth0/auth0-instrumentation/issues/211)) ([8f6cbdd](https://github.com/auth0/auth0-instrumentation/commit/8f6cbdd3dffbfa934f3d74f8c3f7f7e0ee547f2b))

# [3.2.0](https://github.com/auth0/auth0-instrumentation/compare/v3.1.0...v3.2.0) (2019-12-03)


### Features

* dependency updates, remove vulnerabilities ([70ab7b4](https://github.com/auth0/auth0-instrumentation/commit/70ab7b4f0095ab7dcf52bb172382dab13f7e2c96)), closes [#200](https://github.com/auth0/auth0-instrumentation/issues/200)
* **trace:** Nodeback decorator for easy leaf operation instrumentation ([#210](https://github.com/auth0/auth0-instrumentation/issues/210)) ([65721b5](https://github.com/auth0/auth0-instrumentation/commit/65721b50518b4eb486452a972816f7b97371de4e))


<a name="v3.1.0"></a>
# v3.1.0
- Metrics: Exposes Prefix-less instance

<a name="v3.0.0"></a>
# v3.0.0
- Metrics: Supports Setting Empty METRICS_PREFIX
- `METRICS_PREFIX=''` will result in metrics having no prefix. Previously this resulted in falling back to `package.json` `name` value.

<a name="v2.33.0"></a>
# v2.33.0
- Added support for Node 12

### Dependencies
* Update gc-stats v1.2.1 -> 1.4.0
* Update v8-profiler-node8 v6.0.1 -> v8-profile-next v1.1.1

<a name="v2.32.2"></a>
# v2.32.2
- Tracing: span `log()` added to stub

<a name="v2.32.1"></a>
# v2.32.1
- Tracing: span `error()` added to stub

<a name="v2.32.0"></a>
# v2.32.0
- Tracing: span `error()` helper

<a name="v2.31.0"></a>
# v2.31.0

- Tracing: Exposes opentracing span.log function on spanwrapper.

<a name="v2.30.1"></a>
# v2.30.1

### Bugfix
- Error reporter for logger and plain old error reporter exposed on index were being
instantiated twice each time with different arguments, this PR fix that by instantiating the error
reporter a single time on index and injecting it into the logger.
- The version of the raven client being used didn't support release as an option, raven version
was updated to raven@0.12.0 which keeps same API as before. Update to new sentry version
has been tracked.

<a name="v2.30.0"></a>
# v2.30.0

### Feature
- Support option `splitEnvironmentByReleaseChannel` to send env.ENVIRONMENT:env.RELEASE_CHANNEL
to Sentry. Sentry still allows you to select more than one environment in case we want
to get back to the original setup of having all the environment together regardless of the
release channel.

### Bugfix
- Fix metrics when using METRICS_API_KEY

<a name="v2.29.1"></a>
# v2.29.1

### Bugfix
- Fix metrics when using METRICS_API_KEY

<a name="v2.29.0"></a>
# v2.29.0

### Feature
Support tagging sentry errors with the release.

<a name="v2.28.0"></a>
# v2.28.0

### Feature
- Accept `followsFrom` property as an option when creating spans so we can use it instead
of `childOf` when the parent does not depends on the results from the childSpan but just causes it. This is a common relationship on producer-consumer relationship, the consumer sends a message  for the consumer to process it, but it does not usually cares about the result and considers its work finished once the message has been delivered. [More info](https://opentracing.io/docs/best-practices/#tracing-message-bus-scenarios).

- Adds the following tags:
  - AUTH0_WORKER_QUEUE
  - AUTH0_WORKER_STRATEGY
  - AUTH0_WORKER_REQUEUE
  - AUTH0_JOB_ID
  - AUTH0_JOB_TYPE
  - AUTH0_CLIENT_ID
  - AUTH0_CONNECTION_NAME
  - AUTH0_IS_RETRY
  - AUTH0_RETRIES

<a name="v2.27.4"></a>
# v2.27.4
### Dependencies
* Update `aws-kinesis-writable` to v4.2.3

<a name="v2.27.3"></a>
# v2.27.3
### Bugfix
* Resolved error `spanContext.forEachBaggageItem is not a function` when switching
from stubbed to basic tracer dynamically using the switchable tracer.

<a name="v2.27.2"></a>
# v2.27.1
### Bugfix
* Added `isTracingEnabled` parameter as an alias of `isEnabled` since `isEnabled`
applies only to tracing but has a very generic name. `isEnabled` still works so we
don't apply any breaking change but should be consider deprecated.

<a name="v2.27.1"></a>
# v2.27.1
### Bugfix
* Support boolean on mapToTags

<a name="v2.27.0"></a>
# v2.27.0
### Dependencies
* Add trace utils: mapToTags

<a name="v2.26.0"></a>
# v2.26.0
### Dependencies
* Update v8-profiler-node8 v5.7.6 -> v6.0.1
  * [Diff](https://github.com/hyj1991/v8-profiler-node8/compare/d31dc19f13f807d9eacf7c4dda72981d3f983a1e...2f39e25e3d1bc251a7d175e9368755bbac6777f2)
  * Fixes multiple Snyk security vulnerabilities

<a name="v2.24.0"></a>
# v2.24.0
### Dependencies
* Update kinesis-writeable v4.2.0 -> v4.2.1

<a name="v2.23.1"></a>
# v2.23.1

### Security
* Updated security vulnerabilities found in dependencies - [#157](https://github.com/auth0/auth0-instrumentation/pull/157)
  * auth0-common-logging 2.18.0 -> 2.22.0
  * datadog-metrics 0.5.1 -> 0.8.1
  * gc-stats 1.1.1 -> 1.2.1
  * lightstep-tracer 0.20.13 -> 0.21.0

<a name="v2.23.0"></a>
# v2.23.0

### Feature
* Add default tags to tracer - [#153](https://github.com/auth0/auth0-instrumentation/pull/153)

<a name="v2.22.1"></a>
# v2.22.1

### Security
* Updated security vulnerabilities found in dependencies - [#152](https://github.com/auth0/auth0-instrumentation/pull/152)

<a name="v2.22.0"></a>
# v2.22.0
### Bugfix
* Fix span wrapping error that caused tracer to leak memory when using lightstep tracer
### Feature
* Add support to disable the trace on-the-fly (switchable tracer)
* Improve exception handling and logging
* https://github.com/auth0/auth0-instrumentation/compare/v2.20.0...v2.20.1

<a name="v2.21.0"></a>
# v2.21.0
### Feature
* Add `region`/`environment`/`channel` tags to sentry events
* https://github.com/auth0/auth0-instrumentation/compare/v2.20.1...v2.21.0

<a name="v2.20.0"></a>
# v2.20.0
### Bugfix
* Fix undefined function call when using `PROFILE_GC` and not `HUNT_MEMORY_LEAKS`
### Feature
* Add tracing plugin for hapi17
* Support `url` as a synonym for `uri` when wrapping `request`
* https://github.com/auth0/auth0-instrumentation/compare/v2.19.1...v2.20.0

<a name="v2.19.1"></a>
# v2.19.1
### Bugfix
* Minor fix for the stub tracer

<a name="v2.19.0"></a>
# v2.19.0
### Bugfix
* Fix undefined function call when using `PROFILE_GC` and not `HUNT_MEMORY_LEAKS`
### Feature
* Add HTTP request wrapper
* https://github.com/auth0/auth0-instrumentation/compare/v2.19.0...v2.19.1

<a name="v2.18.0"></a>
# v2.18.0
### Feature
* Add Lighstep tracker backend
* https://github.com/auth0/auth0-instrumentation/compare/v2.17.0...v2.18.0

<a name="v2.17.0"></a>
# v2.17.0
### Feature
* Add tracing support
* https://github.com/auth0/auth0-instrumentation/compare/v2.16.0...v2.17.0

<a name="v2.16.0"></a>
# v2.16.0
### Feature
* `endTime` returns the elapsed time
* https://github.com/auth0/auth0-instrumentation/compare/v2.15.1...v2.16.0

<a name="v2.15.1"></a>
# v2.15.1
### Bugfix
* Add `observeBucketed` to metic stubs
* https://github.com/auth0/auth0-instrumentation/compare/v2.15.0...v2.15.1

<a name="v2.15.0"></a>
# v2.15.0
### Bugfix
* Upgrade aws-kinesis-writable library to 4.2.0
### Feature
* Add `observeBucketed` metric type.
* https://github.com/auth0/auth0-instrumentation/compare/v2.14.1...v2.15.0

<a name="v2.14.1"></a>
# v2.14.1
### Bugfix
* Do not default to `undefined` for `purpose` and `environment`
* https://github.com/auth0/auth0-instrumentation/compare/v2.14.0...v2.14.1

<a name="v2.14.0"></a>
# v2.14.0
### Feature
* Include `purpose` and `environment` on log messages from `ENVIRONMENT` and `PURPOSE` env variables
* https://github.com/auth0/auth0-instrumentation/compare/v2.13.1...v2.14.0

<a name="v2.13.1"></a>
# v2.13.1
### Feature
* Add `incrementOne` to metrics
* https://github.com/auth0/auth0-instrumentation/compare/v2.13.0...v2.13.1

<a name="v2.13.0"></a>
# v2.13.0
### Feature
* Allow logging to file using `LOG_FILE` option
* https://github.com/auth0/auth0-instrumentation/compare/v2.12.1...v2.13.0

<a name="v2.12.1"></a>
# v2.12.1
### Bug Fix
* Avoid pushing debug/info logs to Sentry as exceptions
* https://github.com/auth0/auth0-instrumentation/compare/v2.12.0...v2.12.1

<a name="v2.12.0"></a>
# v2.12.0
### Infrastructure Changes
* Supports `hapi v17` via a factory method.
* https://github.com/auth0/auth0-instrumentation/compare/v2.11.4...v2.12.0

<a name="v2.11.4"></a>
# v2.11.4
### Infrastructure Changes
* Introduced `CONSOLE_NICE_FORMAT`
* Replaced `debounce` with `lodash.throttle@4.1.1`
* https://github.com/auth0/auth0-instrumentation/compare/v2.11.3...v2.11.4

<a name="v2.11.3"></a>
# v2.11.3
### Infrastructure Changes
* Support for full credentials object to Kinesis
* Upgrade `kinesis-writable` to `v4.1.3`

<a name="v2.11.2"></a>
# v2.11.2
### Bug Fix
* Force a partitionKey
* Fix `gc-stats` to `v1.0.2`

<a name="v2.11.1"></a>
# v2.11.1
### Bug Fix
* Upgrade `kinesis-writable` to `v4.1.2`

<a name="v2.11.0"></a>
# v2.11.0 - BROKEN
### Bug Fix
* Avoid caching wrong HTTP(s) agent

<a name="v2.10.2"></a>
# v2.10.2 - BROKEN
### Infrastructure Changes
* Bumped the version of `kinesis-writable` to `v4.1.0`.
* Support for STS Session Token on Kinesis instantiation.

<a name="v2.10.1"></a>
# v2.10.1 - BROKEN
### Infrastructure Changes
* Bumped the version of `kinesis-writable` to `v4.0.2`, which prevent undefined calls when writing records to Kinesis.

<a name="v2.10.0"></a>
# v2.10.0 - BROKEN
### Infrastructure Changes
* `init()` is now idempotent. [#77](https://github.com/auth0/auth0-instrumentation/pull/77)
* Support for Bunyan child loggers added [#76](https://github.com/auth0/auth0-instrumentation/pull/76)
* Added a `createProfile()` method on `Profile` [#72](https://github.com/auth0/auth0-instrumentation/pull/72)
* Fixed an issue in which agents could be leaked [#78](https://github.com/auth0/auth0-instrumentation/pull/78)

<a name="v2.9.2"></a>
# v2.9.2
### Infrastructure Changes
* Updated the `v8-profiler` library to `v8-profiler-node8` [#113](https://github.com/node-inspector/v8-profiler/pull/113) to regain compatibility with Node 8.

## v2.7.0

FEATURES:
* Underlying kinesis lib performs retries on failed calls.

## v2.6.0

FEATURES:
* Added Profiler which allows to take heap dumps on demand and produces GC metrics.

NOTES:
* If you already have a `profiler` in your service, you should remove it to avoid having duplicates.
