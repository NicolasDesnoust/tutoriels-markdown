import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CATEGORIES } from '../../../data/categories';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = CATEGORIES;

  constructor() {}

  public fetchCategories(): Observable<Category[]> {
    return of(this.categories);
  }
}
