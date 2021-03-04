import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from 'src/app/core/model/category';
import { Post } from 'src/app/core/model/post';
import { CategoryService } from 'src/app/core/services/category.service';
import { PostService } from 'src/app/core/services/post.service';
import { CardItem } from 'src/app/shared/model/card-item';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page">
      <app-page-header
        title="Desnote Book"
        description="Carnet de notes personnel de Nicolas Desnoust"
      ></app-page-header>

      <main class="container">
        <div class="row d-flex py-4">
          <div class="col-md-12 col-lg-9">
            <app-card-list
              [items]="items$ | async"
              title="Posts récents"
            ></app-card-list>
          </div>
          <div class="col-md-12 category-list-top-divider">
            <mat-divider class="my-4"></mat-divider>
          </div>
          <div class="col-md-12 col-lg-3">
            <app-category-list
              [categories]="categories$ | async"
            ></app-category-list>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  items$: Observable<CardItem[]>;
  categories$: Observable<Category[]>;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.items$ = this.postService.availablePosts$.pipe(
      map((posts) => this.toCardItems(posts))
    );
    this.categories$ = this.categoryService.categories$.pipe(
      map((categories) =>
        categories.filter((category) => category.posts.length > 0)
      )
    );
  }

  private toCardItems(posts: Post[]): CardItem[] {
    return posts.map((post) => ({
      title: post.title,
      body: post.description,
      header: this.datePipe.transform(
        post.createdAt.toISOString(),
        'longDate',
        this.locale
      ),
      footer: post.category.label,
      route: post.route,
    }));
  }
}
