import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostResolver } from './services/post.resolver';

const routes: Routes = [
  {
    path: ':category/:id',
    component: PostDetailsComponent,
    resolve: {
      post: PostResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
