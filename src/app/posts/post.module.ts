import { NgModule } from '@angular/core';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostService } from './post.service';
import { MarkdownModule } from 'ngx-markdown';
import { PostListComponent } from './post-list/post-list.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostListComponent
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
    MarkdownModule.forChild(),
    MaterialModule
  ],
  exports: [
    PostListComponent
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
