// Modules d'Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Modules permettant d'utiliser les fonctionnalités de Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Modules externes
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
//import { Renderer } from 'marked';

// Variables d'environnement, qui diffèrent si l'application est lancée en mode production ou non
import { environment } from '../environments/environment';

// Modules et composants de l'application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TagPageComponent } from './pages/tag-page/tag-page.component';
import { CoreModule } from './core/core.module';
import { PostModule } from './posts/post.module';
import { MaterialModule } from './shared/material/material.module';
import { stringify } from 'querystring';

const renderer: MarkedRenderer = new MarkedRenderer();

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function(ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function(ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

let counter: number = 0;

renderer.code = (code: string, language: string, isEscaped: boolean) => {
  var added = '<div class="code-header"><button class="btn" data-clipboard-target="#code-' 
  + counter 
  + '" style="color: black;"><i class="far fa-copy"></i></button></div>';

  const codeHTML = added + "<div id='code-" + counter + "'>" + (new MarkedRenderer()).code(code, language, isEscaped) + "</div>";
  counter++;
  return codeHTML;
};

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
    MarkdownModule.forRoot({ 
      loader: HttpClient, 
      markedOptions: { 
        provide: MarkedOptions,
        useValue: {
          renderer: renderer,
          headerIds: true
        }
      },
      sanitize: SecurityContext.NONE
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    PostModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
