import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { categories } from '../data/categories';
import { Category } from '../model/category';
import { CategoryAdapterService } from './category-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>(categories);

  constructor(
    private scully: ScullyRoutesService,
    private categoryAdapter: CategoryAdapterService
  ) {
    this.scully.available$
      .pipe(map((scullyRoutes) => this.filterNonBlogRoutes(scullyRoutes)))
      .subscribe((postRoutes) => {
        const categories = this.categoryAdapter.toCategories(
          this.categories,
          postRoutes
        );
        this.categoriesSubject.next(categories);
      });
  }

  get categories$() {
    return this.categoriesSubject.asObservable();
  }
  get categories() {
    return this.categoriesSubject.value;
  }

  findCategory(id: string) {
    return this.categories$.pipe(
      map((categories) => categories.find((category) => category.id === id))
    );
  }

  private filterNonBlogRoutes(scullyRoutes: ScullyRoute[]) {
    return scullyRoutes.filter((scullyRoute) => this.isABlogRoute(scullyRoute));
  }

  private isABlogRoute(scullyRoute: ScullyRoute): boolean {
    return scullyRoute.route.startsWith('/blog/');
  }
}
