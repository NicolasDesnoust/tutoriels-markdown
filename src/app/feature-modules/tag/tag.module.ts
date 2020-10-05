import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagPageComponent } from './containers/tag-page/tag-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

const COMPONENTS = [
  TagPageComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    TagRoutingModule
  ]
})
export class TagModule { }
