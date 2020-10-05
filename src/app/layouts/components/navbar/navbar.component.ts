import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TagService } from 'src/app/core/services/tag.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  myControl: FormControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  @Input() showToggleSidenav: boolean = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(private tagService: TagService) { }

  ngOnInit() {

    this.options = this.tagService.fetchTags(); // Rendre asynchrone quand la méthode sera dev.

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
