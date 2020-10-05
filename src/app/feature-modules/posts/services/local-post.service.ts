import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Post } from "src/app/feature-modules/posts/model/post";
import { POSTS } from "src/app/feature-modules/posts/data/posts";
import { PostService } from './post.service';

export class LocalPostService implements PostService {
  constructor() {}

  getPosts(): Observable<Post[]> {
    console.log("gettitng posts...");
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
