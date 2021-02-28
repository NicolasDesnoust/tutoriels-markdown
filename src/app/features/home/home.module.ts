import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './containers/home-page.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const COMPONENTS = [
  HomePageComponent,
  CategoryListComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    HomeRoutingModule,
    MarkdownModule.forChild(),
  ],
})
export class HomeModule {}
