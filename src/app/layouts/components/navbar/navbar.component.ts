import { DOCUMENT } from "@angular/common";
import { Inject, OnDestroy, Renderer2 } from "@angular/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  theme = "light";

  myControl: FormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  @Input() showToggleSidenav: boolean = false;
  @Input() showFullSearchBar: boolean = true;
  @Input() showFullLogin: boolean = true;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.options = ["css", "spring"]; // Rendre asynchrone quand la méthode sera dev.

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );

    this.setTheme(localStorage.getItem("theme") || "light");
  }

  private setTheme(theme: string): void {
    this.theme = theme;
    const bodyClassList = this.document.querySelector("body")!.classList;
    const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
    if (removeClassList) {
      bodyClassList.remove(...removeClassList);
    }
    bodyClassList.add(`${this.theme}-theme`);
    localStorage.setItem("theme", this.theme);
  }

  toggleTheme(): void {
    this.setTheme(this.theme === "light" ? "dark" : "light");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
