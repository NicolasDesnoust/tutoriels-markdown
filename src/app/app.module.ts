// Modules d'Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Modules permettant d'utiliser les fonctionnalités de Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Autres modules externes
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
//import { Renderer } from 'marked';
const uslug = require("uslug");
const renderer: MarkedRenderer = new MarkedRenderer();

// Variables d'environnement, qui diffèrent si l'application est lancée en mode production ou non
import { environment } from '../environments/environment';

// Modules et composants de l'application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material/material.module';
import { PostModule } from './features/posts/post.module';


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
  var added = '<div matTooltip="Info about the action" class="code-header"><button class="btn" data-clipboard-target="#code-' 
  + counter 
  + '" style="color: black;"><i class="fas fa-copy"></i></button></div>';

  const codeHTML = added + "<div id='code-" + counter + "'>" + (new MarkedRenderer()).code(code, language, isEscaped) + "</div>";
  counter++;
  return codeHTML;
};

// renderer.heading = (text: string, level: number) => {
//   const id = uslug(text);

//   return '<h' + level + ' id="' + id + '">' +
//          '</h' + level + '>';
// };

@NgModule({
  declarations: [
    AppComponent
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
