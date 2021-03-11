import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { Post } from '../model/post';
import { filterNonBlogRoutes, isABlogRoute } from '../util/blog-utils';
import { CategoryService } from './category.service';
import { PostAdapterService } from './post-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private currentPostSubject = new BehaviorSubject<Post>(null);

  constructor(
    private scully: ScullyRoutesService,
    private postAdapter: PostAdapterService,
    private categoryService: CategoryService
  ) {
    this.initCurrentPostSubject();
  }

  get currentPost$(): Observable<Post> {
    return this.currentPostSubject.asObservable();
  }

  initCurrentPostSubject(): void {
    this.scully.getCurrent().pipe(
      tap((scullyRoute) => console.log('current route: ' + JSON.stringify(scullyRoute))),
      filter((scullyRoute) => isABlogRoute(scullyRoute)),
      map((rawPost) =>
        this.postAdapter.toPost(rawPost, this.categoryService.categories)
      )
    ).subscribe(this.currentPostSubject);
  }

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
}
