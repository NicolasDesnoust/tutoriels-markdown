import { Observable, of } from 'rxjs';

import { PostService } from './post.service';
import { Injectable } from '@angular/core';
import { POSTS } from 'src/data/posts';
import { Post } from '../model/post';

@Injectable()
export class LocalPostService implements PostService {
  constructor() {}

  getPosts(): Observable<Post[]> {
    return of(POSTS);
  }

  getPost(id: string): Observable<Post> {
    const posts = POSTS.filter((post) => post.id === id);

    if (posts.length > 0) {
      return of(posts[0]);
    } else {
      return of(null);
    }
  }
}
