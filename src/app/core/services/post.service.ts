import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { combineLatest, merge, Observable, of } from 'rxjs';
import { debounceTime, filter, map, shareReplay, tap } from 'rxjs/operators';

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
    private categoryService: CategoryService,
    private router: Router
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

  scullyGetCurrent(): Observable<ScullyRoute> {
    if (!location) {
      /** probably not in a browser, no current location available */
      return of();
    }
    
    const navigation$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      shareReplay({ refCount: false, bufferSize: 1 })
    );

    return combineLatest([navigation$, this.scully.available$]).pipe(
      tap(([navigationEvent, availableRoutes]) =>
        console.log(
          JSON.stringify(navigationEvent) +
            ' -------------- ' +
            JSON.stringify(availableRoutes.map((r) => r.route))
        )
      ),
      map(([navigationEvent, availableRoutes]) => {
        const curLocation = this.basePathOnly(
          encodeURI((navigationEvent as NavigationEnd).url).trim()
        );
        console.log('curLocation :' + JSON.stringify(curLocation));
        return availableRoutes.find(
          (r) =>
            curLocation === this.basePathOnly(r.route.trim()) ||
            (r.slugs &&
              Array.isArray(r.slugs) &&
              r.slugs.find((slug) =>
                curLocation.endsWith(this.basePathOnly(slug.trim()))
              ))
        );
      }),
      shareReplay({ refCount: false, bufferSize: 1 }),
      tap((route) => console.log('found :' + JSON.stringify(route)))
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

  get currentPost$(): Observable<Post> {
    this.scullyGetCurrent().subscribe();
    return this.scullyGetCurrent().pipe(
      filter((scullyRoute) => isABlogRoute(scullyRoute)),
      map((rawPost) =>
        this.postAdapter.toPost(rawPost, this.categoryService.categories)
      )
    );
  }
}
