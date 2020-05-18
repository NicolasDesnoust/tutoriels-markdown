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
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

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
