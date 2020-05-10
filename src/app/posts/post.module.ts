import { NgModule } from '@angular/core';

import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostService } from './post.service';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [PostDetailsComponent],
  imports: [
    SharedModule,
    PostRoutingModule,
    MarkdownModule.forChild(),
  ],
  providers: [
    PostService
  ]
})
export class PostModule { }
