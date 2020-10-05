import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { AuthLayoutComponent } from './containers/auth-layout/auth-layout.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { TableOfContentsComponent } from './components/table-of-contents/table-of-contents.component';
import { NavbarOnlyLayoutComponent } from './containers/navbar-only-layout/navbar-only-layout.component';

const COMPONENTS = [
  MainLayoutComponent, AuthLayoutComponent, NavbarOnlyLayoutComponent,
  NavbarComponent, LeftSidenavComponent, TableOfContentsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule
  ],
  exports: [TableOfContentsComponent]
})
export class LayoutsModule { }
