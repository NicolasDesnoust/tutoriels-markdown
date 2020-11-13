import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss']
})
export class CopyButtonComponent implements OnInit {

  @Input() counter: number;
  message = "Code copié";

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }
}
