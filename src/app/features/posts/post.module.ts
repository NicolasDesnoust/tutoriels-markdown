import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { LocalPostService } from './services/local-post.service';
import { environment } from 'src/environments/environment';
import { FirebasePostService } from './services/firebase-post.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

const COMPONENTS = [PostDetailsComponent, PostListComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    LayoutsModule,
    PostRoutingModule,
    MarkdownModule.forChild(),
  ],
  exports: [PostListComponent],
  providers: [
    {
      provide: 'PostService',
      useClass:
        environment.dataSource === 'local'
          ? LocalPostService
          : FirebasePostService,
    },
  ],
})
export class PostModule {}
