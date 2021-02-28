import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Category } from 'src/app/core/model/category';
import { Post } from 'src/app/core/model/post';
import { CategoryService } from 'src/app/core/services/category.service';
import { CardItem } from 'src/app/shared/components/card-list/card-list.component';

@Component({
  selector: 'app-category-page',
  template: `
    <ng-container *ngIf="category$ | async as category">
      <!-- <mat-toolbar
        class="category-header"
        id="particles-js"
        style="height: 128px;"
      >
        <span
          style="padding-left: 4rem; font-weight: 400; font-size: 26px; display: flex;
align-items: center;"
        >
          <img
            class="category-icon {{ category.id }}-icon"
            src="./assets/logos/{{ category.id }}-icon.svg"
            alt="{{ category.label }} icon"
          />
          {{ category.label }}
        </span>
      </mat-toolbar> -->
      <div class="category-page" style="height: 100%; flex-grow:1">
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
                      <!-- <img
                        class="category-icon {{
                          category.id
                        }}-icon ml-n5 ml-md-0"
                        src="./assets/logos/{{ category.id }}-icon.svg"
                        alt="{{ category.label }} icon"
                      /> -->
                      <h1
                        style="display: inline-block; margin-bottom: 0 !important;"
                        class="category-title"
                      >
                        {{ category.label }}
                      </h1>
                    </div>

                    <p class="h5 anti-aliased category-description">
                      {{ category.description }}
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

                  <div class="col-md-6 d-none d-md-block">
                    <!-- 
                    <img
                      class="intro-hero-img"
                      src="https://static1.smartbear.co/swagger/media/assets/images/sw_ov_intro_hero.svg"
                    />-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main>
          <div *ngIf="items$ | async as items">
            <app-card-list
              [items]="items"
              title="Posts récents"
            ></app-card-list>
            <!-- <epu-card-slider *ngIf="items.length > 0" [options]="items">
              <ng-template let-option>
                <app-card [item]="option"></app-card>
              </ng-template>
            </epu-card-slider> -->
          </div>
        </main>
      </div>
    </ng-container>
  `,
  styleUrls: ['./category-page.component.scss'],
})
export class CategoryPageComponent implements OnInit {
  category$: Observable<Category>;
  items$: Observable<CardItem[]>;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.category$ = this.route.paramMap.pipe(
      switchMap((params) => this.categoryService.findCategory(params.get('id')))
    );
    this.items$ = this.category$.pipe(
      map((category) => this.toCardItems(category.posts))
    );
  }

  ngOnInit(): void {}

  private toCardItems(posts: Post[]): CardItem[] {
    return posts.map((post) => ({
      title: post.title,
      body: post.description,
      header: this.datePipe.transform(
        post.createdAt.toISOString(),
        'longDate',
        this.locale
      ),
      route: post.route,
    }));
  }
}
