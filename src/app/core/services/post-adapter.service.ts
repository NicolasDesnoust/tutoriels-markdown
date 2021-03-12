import { Injectable } from '@angular/core';
import { Category } from '../model/category';

import { PostMetadata } from '../model/post';

@Injectable({
  providedIn: 'root',
})
export class PostAdapterService {
  toPostsMetadata(
    rawPostsMetadata: any[],
    categories: Category[]
  ): PostMetadata[] {
    return rawPostsMetadata.map((rawPostMetadata) =>
      this.toPostMetadata(rawPostMetadata, categories)
    );
  }

  toPostMetadata(rawPostMetadata: any, categories: Category[]): PostMetadata {
    const category = categories.find(
      (category) => category.id === rawPostMetadata.category
    );

    return {
      ...rawPostMetadata,
      category,
      createdAt: new Date(rawPostMetadata.createdAt),
    };
  }
}
