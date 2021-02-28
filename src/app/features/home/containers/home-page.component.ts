import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/core/model/category';

import { Post } from 'src/app/core/model/post';
import { CategoryService } from 'src/app/core/services/category.service';
import { PostService } from 'src/app/core/services/post.service';
import { CardItem } from 'src/app/shared/components/card-list/card-list.component';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page">
      <section
        class="band overflow-hidden band-full-width-content"
        id=""
        data-nav-text=""
      >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div
                class="home_hero row text-center text-md-left py-4 py-md-5 px-4 px-xl-6"
              >
                <div class="col-md-6" style="margin-top: -1rem">
                  <div
                    class="d-flex mb-2 justify-content-center justify-content-md-start"
                    style="align-items: center"
                  >
                    <h1 class="home-title">Desnote Book</h1>
                  </div>

                  <p class="h5 anti-aliased home-description">
                    Carnet de notes personnel de Nicolas Desnoust
                  </p>

                  <p class="mt-5">
                    <a
                      style="display: none !important"
                      class="btn btn-swagger w-75 mx-auto mb-3 d-block 
                        d-md-inline btn-swagger-outlined btn-nav mr-md-3"
                      href="/tools/"
                      id="swaggerToolsNewCta"
                      >Explore Swagger Tools
                    </a>
                  </p>
                </div>

                <div class="col-md-6 d-none d-md-block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main class="container">
        <div class="row" style="display:flex; padding: 4rem 0">
          <div class="col-md-12 col-lg-9">
            <app-card-list
              [items]="items$ | async"
              title="Posts récents"
            ></app-card-list>
          </div>
          <div class="col-md-12 category-list-top-divider">
            <mat-divider style="margin: 2rem 0"></mat-divider>
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
