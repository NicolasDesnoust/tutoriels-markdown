// Modules d'Angular
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Autres modules externes
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ScullyLibModule } from '@scullyio/ng-lib';

// Modules et composants de l'application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/modules/material.module';
import { MarkdownRenderer } from './core/services/markdown-renderer.service';
import { appInitializerProviders } from './core/initializers';
import { LayoutsModule } from './layouts/layouts.module';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    LayoutsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          renderer: new MarkdownRenderer(),
          headerIds: true,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
    BrowserAnimationsModule,
    MaterialModule,
    ScullyLibModule.forRoot({
      alwaysMonitor: true,
      useTransferState: true,
    }),
  ],
  providers: [
    ...appInitializerProviders,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
