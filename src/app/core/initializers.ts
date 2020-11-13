import { APP_INITIALIZER } from '@angular/core';

import { ThemeHandler } from './services/theme-handler.service';

export function themeHandlerFactory(themeHandler: ThemeHandler) {
  return () => themeHandler.applyThemeOnStartup();
}

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: themeHandlerFactory,
    deps: [ThemeHandler],
    multi: true,
  },
];