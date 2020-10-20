import { NgModule } from "@angular/core";
import { MarkdownModule } from "ngx-markdown";

import { PostRoutingModule } from "./post-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { LayoutsModule } from "src/app/layouts/layouts.module";
import { LocalPostService } from "./services/local-post.service";
import { environment } from "src/environments/environment";
import { FirebasePostService } from "./services/firebase-post.service";

const COMPONENTS = [PostDetailsComponent, PostListComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    PostRoutingModule,
    LayoutsModule,
    MarkdownModule.forChild(),
  ],
  exports: [PostListComponent],
  providers: [
    {
      provide: "PostService",
      useClass:
        environment.dataSource === "local"
          ? LocalPostService
          : FirebasePostService,
    }
  ]
})
export class PostModule {}
