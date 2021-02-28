import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copy-button',
  template: `
    <button
      class="btn"
      matTooltip="Copier le code"
      attr.data-clipboard-target="#code-{{ counter }}"
      (click)="openSnackBar(message)"
    >
      <i class="fas fa-copy"></i>
    </button>
  `,
})
export class CopyButtonComponent {
  @Input() counter: number;
  message = 'Code copié dans le presse-papiers';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent'],
    });
  }
}
