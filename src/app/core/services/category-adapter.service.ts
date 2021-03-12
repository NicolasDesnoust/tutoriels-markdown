import { Injectable } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Category } from '../model/category';
import { PostAdapterService } from './post-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryAdapterService {
  constructor(private postAdapter: PostAdapterService) {}

  toCategories(rawCategories: any[], scullyRoutes: ScullyRoute[]): Category[] {
    const categories: Category[] = rawCategories;

    scullyRoutes.forEach((scullyRoute) => {
      const category = categories.find(
        (category) => category.id === scullyRoute.category
      );

      if (!category) {
        console.error(
          `Category not found for : ${JSON.stringify(scullyRoute)}`
        );
      } else {
        category.postsMetadata.push(this.postAdapter.toPostMetadata(scullyRoute, categories));
      }
    });

    return categories;
  }
}
