import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Post } from '../model/post';
import { filterNonBlogRoutes, isABlogRoute } from '../util/blog-utils';
import { CategoryService } from './category.service';
import { PostAdapterService } from './post-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private scully: ScullyRoutesService,
    private postAdapter: PostAdapterService,
    private categoryService: CategoryService
  ) {}

  get availablePosts$(): Observable<Post[]> {
    return this.scully.available$.pipe(
      map((scullyRoutes) => filterNonBlogRoutes(scullyRoutes)),
      map((rawPosts) =>
        this.postAdapter.toPosts(rawPosts, this.categoryService.categories)
      )
    ); 
  }

  get allPosts$(): Observable<Post[]> {
    return this.scully.allRoutes$.pipe(
      map((scullyRoutes) => filterNonBlogRoutes(scullyRoutes)),
      map((rawPosts) =>
        this.postAdapter.toPosts(rawPosts, this.categoryService.categories)
      )
    );
  }

  get currentPost$(): Observable<Post> {
    return this.scully.getCurrent().pipe(
      filter(scullyRoute => isABlogRoute(scullyRoute)),
      map((rawPost) =>
        this.postAdapter.toPost(rawPost, this.categoryService.categories)
      )
    );
  }
}
