import { Injectable } from '@angular/core';
import { NGXLogger, NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { Observable, of } from 'rxjs';

import { BaseStartupService } from './base-startup.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class Logger extends BaseStartupService {
  constructor(private configService: ConfigService, private logger: NGXLogger) {
    super();
  }

  protected load(): Observable<void> {
    const configuration = this.configService.configuration;
    const obs$ = of(null);
    obs$.subscribe((_) => {
      // TODO: verify level
      const loggingLevel = configuration.logging.level as number;

      this.logger.updateConfig({
        level: loggingLevel,
      });

      this.logger.registerMonitor(new MyLoggerMonitor());
    });

    return obs$;
  }

  trace(message, source, error) {
    this.logger.trace(message, source, error);
  }

  debug(message, source, error) {
    this.logger.debug(message, source, error);
  }

  info(message) {
    this.logger.info(message);
  }

  log(message, source, error) {
    this.logger.log(message, source, error);
  }

  warn(message, error) {
    this.logger.warn(message, error);
  }

  error(message, source, error) {
    this.logger.error(message, source, error);
  }

  fatal(message, source, error) {
    this.logger.fatal(message, source, error);
  }
}

export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(logObject: NGXLogInterface): void {
    console.log(
      'logging stuff to an API if we need a custom transport ',
      logObject
    );
  }
}
