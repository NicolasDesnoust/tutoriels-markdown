import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

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
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.initCurrentPostSubject();
  }

  get currentPost$(): Observable<Post> {
    return this.currentPostSubject.asObservable();
  }

  scullyGetCurrent(): Observable<ScullyRoute> {
    if (!location) {
      console.log("No location, probably not in a browser");
      /** probably not in a browser, no current location available */
      return of();
    }
    /** fire off at start, and when navigation is done. */
    return merge(of(new NavigationEnd(0, '', '')), this.router.events).pipe(
      tap(e => console.log(JSON.stringify(e.toString()))),
      filter((e) => e instanceof NavigationEnd),
      tap(e => console.log(JSON.stringify(e))),
      switchMap(() => this.scully.available$),
      map((list: any[]) => {
        list.forEach(elt => console.log(JSON.stringify("elt: " + JSON.stringify(elt))));
        console.log(JSON.stringify("location.pathname: " + location.pathname));
        const curLocation = this.basePathOnly(encodeURI(location.pathname).trim());
        console.log(JSON.stringify("curLocation: " + curLocation));
        return list.find(
          (r) =>
            curLocation === this.basePathOnly(r.route.trim()) ||
            (r.slugs &&
              Array.isArray(r.slugs) &&
              r.slugs.find((slug) =>
                curLocation.endsWith(this.basePathOnly(slug.trim()))
              ))
        );
      }),
      tap(found => console.log("found: " + JSON.stringify(found)))
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

  initCurrentPostSubject(): void {
    this.scullyGetCurrent().pipe(
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
