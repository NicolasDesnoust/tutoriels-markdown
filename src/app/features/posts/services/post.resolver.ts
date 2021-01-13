import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Post } from '../model/post';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post> {
  constructor(@Inject('PostService') private postService: PostService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.postService.getPost(route.paramMap.get('id'));
  }
}