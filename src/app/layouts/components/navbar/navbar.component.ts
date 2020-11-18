import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {
  Theme,
  ThemeHandler,
} from 'src/app/core/services/startup/theme-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  myControl: FormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  @Input() showToggleSidenav: boolean = false;
  @Input() showFullSearchBar: boolean = true;
  @Input() showFullLogin: boolean = true;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private themeHandler: ThemeHandler) {}

  ngOnInit() {
    this.options = ['css', 'spring']; // Rendre asynchrone quand la méthode sera dev.

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  toggleTheme(): void {
    const currentTheme = this.themeHandler.theme;
    this.themeHandler.updateTheme(
      currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
