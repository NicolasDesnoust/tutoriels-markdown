import { PlatformLocation } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <button
      class="btn"
      style="    border: 0;
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    width: auto;
    background-color: transparent"
      matTooltip="Copier le lien vers cette section"
      [attr.data-clipboard-text]="url + '#' + href"
      (click)="openSnackBar(message)"
    >
      <i-feather name="link-2" class="header-link"></i-feather>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterLinkComponent {
  @Input() public href: string;
  message = 'Lien copié dans le presse-papiers';
  url: string;

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private platformLocation: PlatformLocation
  ) {
    const location = (this.platformLocation as any).location.toString();

    if (location.includes('#')) {
      const ind = location.indexOf('#');
      this.url = location.slice(0, ind);
    } else {
      this.url = location;
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
