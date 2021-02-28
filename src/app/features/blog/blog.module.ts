import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { MarkdownModule } from 'ngx-markdown';
import { LayoutsModule } from 'src/app/layouts/layouts.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './components/blog/blog.component';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    SharedModule,
    BlogRoutingModule,
    ScullyLibModule,
    LayoutsModule,
    MarkdownModule.forChild(),
  ],
})
export class BlogModule {}
