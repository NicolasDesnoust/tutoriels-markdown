import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { NavbarOnlyLayoutComponent } from './containers/navbar-only-layout/navbar-only-layout.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { SharedModule } from '../shared/shared.module';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { NgAisModule } from 'angular-instantsearch';
import { A11yModule } from '@angular/cdk/a11y';
import { ClickOutsideModule } from 'ng-click-outside';

const COMPONENTS = [
  NavbarComponent,
  TableOfContentsComponent,
  LeftSidenavComponent,
  SubHeaderComponent,
  SearchbarComponent,
];

const LAYOUTS = [MainLayoutComponent, NavbarOnlyLayoutComponent];

@NgModule({
  declarations: [...COMPONENTS, ...LAYOUTS],
  imports: [
    SharedModule,
    MarkdownModule.forChild(),
    NgAisModule,
    A11yModule,
    ClickOutsideModule,
  ],
  exports: [TableOfContentsComponent],
})
export class LayoutsModule {}
