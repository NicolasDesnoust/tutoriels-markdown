import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { PostResolver } from './services/post.resolver';

const routes: Routes = [
  {
    path: ':slug',
    component: BlogComponent,
    resolve: { post: PostResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
