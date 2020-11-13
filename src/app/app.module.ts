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
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

// Variables d'environnement, qui diffèrent si l'application est lancée en mode production ou non
import { environment } from '../environments/environment';

// Modules et composants de l'application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material/material.module';
import { PostModule } from './features/posts/post.module';
import { MarkdownRenderer } from './core/services/markdown-renderer.service';
import { appInitializerProviders } from './core/initializers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot({ 
      loader: HttpClient, 
      markedOptions: { 
        provide: MarkedOptions,
        useValue: {
          renderer: new MarkdownRenderer(),
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
  providers: [appInitializerProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
