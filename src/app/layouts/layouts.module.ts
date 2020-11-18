import { NgModule } from '@angular/core';

import { AuthLayoutComponent } from './containers/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { NavbarOnlyLayoutComponent } from './containers/navbar-only-layout/navbar-only-layout.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { SharedModule } from '../shared/shared.module';
import { MarkdownModule } from 'ngx-markdown';

const COMPONENTS = [
  NavbarComponent,
  TableOfContentsComponent,
  LeftSidenavComponent,
];

const LAYOUTS = [
  AuthLayoutComponent,
  MainLayoutComponent,
  NavbarOnlyLayoutComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [SharedModule, MarkdownModule.forChild()],
  exports: [TableOfContentsComponent],
})
export class LayoutsModule {}
