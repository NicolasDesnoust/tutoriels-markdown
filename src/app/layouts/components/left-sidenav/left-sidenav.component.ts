import { Component, Input } from '@angular/core';

import { Category } from 'src/app/core/model/category';

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss'],
})
export class LeftSidenavComponent {
  _categories: Category[] = [];

  @Input() set categories(categories: Category[]) {
    // * Fix race condition with Routerlink Active
    setTimeout(() => (this._categories = categories));
  }

  get categories() {
    return this._categories;
  }
}
