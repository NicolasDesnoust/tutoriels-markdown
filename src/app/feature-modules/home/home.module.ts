import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { MarkdownModule } from 'ngx-markdown';

import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { PostModule } from '../posts/post.module';
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
    PostModule,
    MarkdownModule.forChild()
  ]
})
export class HomeModule { }
