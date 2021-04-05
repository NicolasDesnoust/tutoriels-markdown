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

  constructor(
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
  }

  ngAfterViewInit() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }
}
