import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [NavbarComponent, LeftSidenavComponent, RightSidenavComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    RightSidenavComponent,
    NavbarComponent,
    LeftSidenavComponent
  ]
})
export class CoreModule { }
