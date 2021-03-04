import { Injectable } from '@angular/core';
import { Category } from '../model/category';

import { Post } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostAdapterService {
  toPosts(rawPosts: any[], categories: Category[]): Post[] {
    return rawPosts.map((rawPost) => this.toPost(rawPost, categories));
  }

  toPost(rawPost: any, categories: Category[]): Post {
    const category = categories.find(
      (category) => category.id === rawPost.category
    );

    return {
      ...rawPost,
      category,
      createdAt: new Date(rawPost.createdAt),
    };
  }
}
