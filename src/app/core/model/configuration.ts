export enum LoggerLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  LOG = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
  OFF = 7,
}

export class Configuration {
  env: 'dev' | 'prod';
  logging: {
    level: LoggerLevel;
  };
}
