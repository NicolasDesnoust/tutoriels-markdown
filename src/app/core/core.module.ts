import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { RouterModule } from '@angular/router';

import { ThemeHandler } from './services/startup/theme-handler.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MarkdownModule.forChild(),
    LoggerModule.forRoot({
      // TODO: use runtimeConfig
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.INFO,
    }),
  ],
  providers: [ThemeHandler],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
