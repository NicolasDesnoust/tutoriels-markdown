import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-only-layout',
  template: `
    <div class="navbar-only-layout-container">
      <app-navbar
        class="navbar"
        [showToggleSidenav]="false"
        [showFullSearchBar]="false"
        [showBranding]="false"
        [isTransparent]="true"
        color="primary"
      ></app-navbar>

      <!-- Main content -->
      <div class="mat-elevation-z2 main-content-wrapper" role="main">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./navbar-only-layout.component.scss'],
})
export class NavbarOnlyLayoutComponent {}
