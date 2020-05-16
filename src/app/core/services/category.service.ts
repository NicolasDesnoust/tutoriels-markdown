import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { CATEGORIES } from '../model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = CATEGORIES;

  constructor() { }

  public fetchCategories(): Category[] {
    return this.categories;
  }
}
