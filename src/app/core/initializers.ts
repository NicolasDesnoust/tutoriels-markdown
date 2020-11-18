import { APP_INITIALIZER, InjectionToken } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseStartupService } from './services/startup/base-startup.service';

import { ConfigService } from './services/startup/config.service';
import { Logger } from './services/startup/logger.service';
import { ThemeHandler } from './services/startup/theme-handler.service';

export type DependerFactory = () => () => Observable<void>;

/*----------------------- Injection Tokens -----------------------*/

const configServiceDependers = new InjectionToken<DependerFactory[]>(
  'ConfigServiceDependers'
);
const loggerDependers = new InjectionToken<DependerFactory[]>(
  'LoggerDependers'
);

/*-------------------------- Generic Factories --------------------------*/

export function startupServiceFactory(startupService: BaseStartupService) {
  return () => startupService.loadOnStartup();
}

export function startupServiceWithDependersFactory(
  startupService: BaseStartupService,
  dependerFactories: DependerFactory[]
) {
  return () =>
    startupService
      .loadOnStartup()
      .pipe(
        switchMap((_) => {
          return forkJoin(dependerFactories.map((dep) => dep()));
        })
      )
      .toPromise();
}

/*-------------------- App Initializer Providers --------------------*/

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: startupServiceWithDependersFactory,
    deps: [ConfigService, configServiceDependers],
    multi: true,
  },
  {
    provide: configServiceDependers,
    // Use a factory that return an array of dependant functions to be executed
    useFactory: (logger: Logger, loggerDeps: DependerFactory[]) => {
      // * Register ConfigService dependers factories here
      return [startupServiceWithDependersFactory(logger, loggerDeps)];
    },
    deps: [Logger, loggerDependers],
  },
  {
    provide: loggerDependers,
    // Use a factory that return an array of dependant functions to be executed
    useFactory: (themeHandler: ThemeHandler) => {
      // * Register Logger dependers factories here
      return [startupServiceFactory(themeHandler)];
    },
    deps: [ThemeHandler],
  },
];
