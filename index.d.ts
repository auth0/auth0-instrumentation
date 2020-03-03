type Callback = (err?: any, result?: any) => void;

export declare interface Logger {
  child(options: Object, simple?: boolean): Logger;
  debug(tags: object, message?: string): void;
  debug(message: string, tags?: object): void;
  info(tags: object, message?: string): void;
  info(message: string, tags?: object): void;
  warn(tags: object, message?: string): void;
  warn(message: string, tags?: object): void;
  error(tags: object, message?: string): void;
  error(message: string, tags?: object): void;
  fatal(tags: object, message?: string): void;
  fatal(message: string, tags?: object): void;
}

export declare interface Metrics {
  setDefaultTags(tags: object): void;
  observeBucketed(
    name: string,
    value: number,
    buckets: number[],
    time: number,
    tags?: object,
    callback?: Callback
  ): void;
  gauge(name: string, value: number, tags?: object, callback?: Callback): void;
  histogram(
    name: string,
    time: number,
    tags?: object,
    callback?: Callback
  ): void;
  incrementOne(
    name: string,
    count: number,
    tags?: object,
    callback?: Callback
  ): void;
  increment(
    name: string,
    count: number,
    tags?: object,
    callback?: Callback
  ): void;
  time(name: string, tags?: object): string;
  endTime(id: string, tags?: object): void;
  startResourceCollection(tags?: object): void;
  flush(): void;
  close(): void;
  std: any;
}

export declare interface ExceptionOptions {
  extra?: any;
}

export declare interface ErrorReporter {
  captureException(err: any, options: ExceptionOptions): void;
  captureMessage(msg: string, options: ExceptionOptions): void;
  patchGlobal(exitHandler: () => void): void;
  express: {
    requestHandler: any;
    errorHandler: any;
  };
  hapi: {
    plugin: any,
  };
}

export declare interface Span {
  log(obj: any): void;
  error(err: any): void;
  finish(): void;
  setTag(tag: string, value: string): void;
  addTags(tags: { [k: string]: string }): void;
  tracer: () => Tracer;
  setOperationName(name: string): void,
  context: any;
  isStub: boolean
}

export declare interface Tracer {
  startSpan(name: string, options?: any): Span;
  inject(context: any, format: string, carrier: any): void;
  extract(format: string, carrier: any): any;
  Tags: any;
  middleware: any;
}

export declare interface Profiler {
  setupProcessListener(): void;
  createProfile(callback: Callback): void;
  createProfile(timeout: number, callback: Callback): void;
  createSnapshot(name: string): void;
  report(path: string, reason: string): void;
  setupGCReporter(): void;
}

export declare function init(packageJson: any, env: any, serializers: any): void;
export declare const errorReporter: ErrorReporter;
export declare const metrics: Metrics;
export declare const logger: Logger;
export declare const profiler: Profiler;
export declare const tracer: Tracer;
