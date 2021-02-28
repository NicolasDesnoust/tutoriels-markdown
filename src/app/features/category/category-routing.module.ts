import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './containers/category-page/category-page.component';

const routes: Routes = [
  { path: ':id', component: CategoryPageComponent, data: { title: 'test' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
