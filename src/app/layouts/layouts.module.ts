import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { NavbarOnlyLayoutComponent } from './containers/navbar-only-layout/navbar-only-layout.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { SharedModule } from '../shared/shared.module';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';

const COMPONENTS = [
  NavbarComponent,
  TableOfContentsComponent,
  LeftSidenavComponent,
];

const LAYOUTS = [
  MainLayoutComponent,
  NavbarOnlyLayoutComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS, SubHeaderComponent],
  imports: [SharedModule, MarkdownModule.forChild()],
  exports: [TableOfContentsComponent],
})
export class LayoutsModule {}
