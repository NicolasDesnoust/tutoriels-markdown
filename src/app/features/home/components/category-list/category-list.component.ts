import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Category } from 'src/app/core/model/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { MEDIAQUERIES, MOBILE_MEDIAQUERY } from 'src/data/mediaqueries';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;

  private layoutChangesSubscription: Subscription;
  showFullButtons = true;

  constructor(
    private categoryService: CategoryService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.categories$ = this.categoryService.fetchCategories();
  }

  ngOnInit(): void {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([...MEDIAQUERIES])
      .subscribe((state) => {
        this.showFullButtons = !state.breakpoints[MOBILE_MEDIAQUERY];
      });
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }
}
