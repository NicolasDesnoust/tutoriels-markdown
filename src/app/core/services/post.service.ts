import { Injectable } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { PostMetadata } from '../model/post';
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

  get availablePostsMetadata$(): Observable<PostMetadata[]> {
    return this.scully.available$.pipe(
      map((scullyRoutes) => filterNonBlogRoutes(scullyRoutes)),
      map((rawPostsMetadata) =>
        this.postAdapter.toPostsMetadata(
          rawPostsMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  get allPostsMetadata$(): Observable<PostMetadata[]> {
    return this.scully.allRoutes$.pipe(
      map((scullyRoutes) => filterNonBlogRoutes(scullyRoutes)),
      map((rawPostsMetadata) =>
        this.postAdapter.toPostsMetadata(
          rawPostsMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  getPostMetadata$(slug: string): Observable<PostMetadata> {
    return this.scully.available$.pipe(
      map((availableRoutes) =>
        availableRoutes.find((r) =>
          this.basePathOnly(r.route.trim()).endsWith(slug)
        )
      ),
      filter((scullyRoute) => isABlogRoute(scullyRoute)),
      map((rawPostMetadata) =>
        this.postAdapter.toPostMetadata(
          rawPostMetadata,
          this.categoryService.categories
        )
      )
    );
  }

  private basePathOnly = (str: string): string => {
    if (str.includes('#')) {
      str = str.split('#')[0];
    }
    if (str.includes('?')) {
      str = str.split('?')[0];
    }
    const cleanedUpVersion = str.endsWith('/') ? str.slice(0, -1) : str;
    return cleanedUpVersion;
  };

}
