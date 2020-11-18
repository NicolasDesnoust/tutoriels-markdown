import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';

import * as Gumshoe from 'gumshoejs';
import {
  TocHeader,
  TableOfContentsService,
} from 'src/app/core/services/table-of-contents.service';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.scss'],
})
export class TableOfContentsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() limit: number;
  headers: TocHeader[];
  filteredHeaders$ = new BehaviorSubject<TocHeader[]>([]);
  expanded = false;
  currentSection$: Observable<string>;

  private scrollSpy: Gumshoe;

  constructor(
    private tocService: TableOfContentsService,
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit() {
    const headers$ = this.tocService.tocContent$.pipe(
      map((headers) =>
        headers.filter((header) => header.lvl === 2 || header.lvl === 3)
      ),
      tap((headers) => (this.headers = headers)),
      map((headers) => (this.limit ? headers.slice(0, this.limit) : headers))
    );

    headers$.subscribe(this.filteredHeaders$);

    // TODO: unsub / refactor
    this.filteredHeaders$.subscribe((a) => {
      console.log('new headers');
      setTimeout((_) => this.setScrollSpy(), 2000);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.limit) {
      this.applyLimit(this.limit);
    }
  }

  applyLimit(limit: number) {
    if (this.headers) {
      const filteredHeaders =
        limit != null ? this.headers.slice(0, this.limit) : this.headers;

      this.expanded = limit == null;
      this.filteredHeaders$.next(filteredHeaders);
    }
  }

  ngOnDestroy(): void {
    this.destroyScrollSpy();
  }

  destroyScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.destroy();
    }
  }

  setScrollSpy(): void {
    if (this.scrollSpy) {
      this.scrollSpy.setup();
      this.scrollSpy.detect();
      return;
    }

    this.zone.onStable.pipe(first()).subscribe(() => {
      const hostElement = this.elementRef.nativeElement;
      const linkSelector = `${hostElement.tagName}.${hostElement.className} a`;
      this.scrollSpy = new Gumshoe(linkSelector, {
        offset: 64,
        reflow: true,
        navClass: 'li--active',
      });
    });
  }
}
