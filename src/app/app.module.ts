import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TagPageComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
