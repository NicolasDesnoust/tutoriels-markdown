import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Post } from '../model/post';
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
      map((scullyRoutes) => this.filterNonBlogRoutes(scullyRoutes)),
      map((rawPosts) =>
        this.postAdapter.toPosts(rawPosts, this.categoryService.categories)
      )
    ); 
  }

  get allPosts$(): Observable<Post[]> {
    return this.scully.allRoutes$.pipe(
      map((scullyRoutes) => this.filterNonBlogRoutes(scullyRoutes)),
      map((rawPosts) =>
        this.postAdapter.toPosts(rawPosts, this.categoryService.categories)
      )
    );
  }

  get currentPost$(): Observable<Post> {
    return this.scully.getCurrent().pipe(
      filter(scullyRoute => this.isABlogRoute(scullyRoute)),
      map((rawPost) =>
        this.postAdapter.toPost(rawPost, this.categoryService.categories)
      )
    );
  }

  private filterNonBlogRoutes(scullyRoutes: ScullyRoute[]) {
    return scullyRoutes.filter((scullyRoute) => this.isABlogRoute(scullyRoute));
  }

  private isABlogRoute(scullyRoute: ScullyRoute): boolean {
    return scullyRoute.route.startsWith('/blog/');
  }
}
