import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { LoggerModule, NgxLoggerLevel, LoggerConfig } from 'ngx-logger';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ThemeHandler } from './services/startup/theme-handler.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

const COMPONENTS = [LoginComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule, // TODO: refactorer le core module pour supprimer cette dépendance
    RouterModule,
    FormsModule,
    MarkdownModule.forChild(),
    LoggerModule.forRoot({
      // TODO: use runtimeConfig
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.INFO,
    }),
  ],
  exports: [...COMPONENTS],
  providers: [ThemeHandler],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
