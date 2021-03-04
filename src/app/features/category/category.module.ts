import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryPageComponent } from './containers/category-page/category-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
