import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidenavComponent } from './components/left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './components/right-sidenav/right-sidenav.component';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [NavbarComponent, LeftSidenavComponent, RightSidenavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MarkdownModule.forChild()
  ],
  exports: [
    RightSidenavComponent,
    NavbarComponent,
    LeftSidenavComponent
  ]
})
export class CoreModule { }
