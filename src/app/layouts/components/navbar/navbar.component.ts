import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Theme } from 'src/app/core/model/theme';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemeHandler } from 'src/app/core/services/startup/theme-handler.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  myControl: FormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  isUserLoggedIn$: Observable<boolean>;

  @Input() showToggleSidenav = false;
  @Input() showFullSearchBar = true;
  @Input() showFullLogin = true;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    private themeHandler: ThemeHandler,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.isUserLoggedIn$ = this.userService.isLoggedIn$();
  }

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

  logout() {
    this.authService.logout();
  }
}
