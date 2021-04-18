import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';
import { connectAutocomplete } from 'instantsearch.js/es/connectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThemeHandler } from 'src/app/core/services/startup/theme-handler.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent extends BaseWidget implements AfterViewInit {
  state: {
    query: string;
    refine: Function;
    indices: object[];
  };

  @Output() onCloseButtonClick = new EventEmitter<void>();
  @Output() onQuerySuggestionClick = new EventEmitter<{ query: string }>();

  @ViewChild('searchInput') searchInput: ElementRef;

  algoliaCreditPath: Observable<string>;

  constructor(
    private themeHandler: ThemeHandler,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('SearchboxComponent');
  }

  handleChange($event: KeyboardEvent) {
    this.state.refine(($event.target as HTMLInputElement).value);
  }

  ngOnInit() {
    this.createWidget(connectAutocomplete, {});
    super.ngOnInit();

    this.algoliaCreditPath = this.themeHandler.theme$.pipe(
      map((theme) => `assets/logos/search-by-algolia-${theme}-background.svg`)
    );
  }

  ngAfterViewInit() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }
}
