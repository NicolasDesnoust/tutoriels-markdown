import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  TableOfContentsService,
  TocHeader,
} from "../../services/table-of-contents.service";

@Component({
  selector: "app-table-of-contents",
  templateUrl: "./table-of-contents.component.html",
  styleUrls: ["./table-of-contents.component.scss"],
})
export class TableOfContentsComponent implements OnInit, OnChanges {
  @Input() limit: number;
  headers: TocHeader[];
  filteredHeaders$ = new BehaviorSubject<TocHeader[]>([]);
  expanded: boolean = false;

  constructor(private tocService: TableOfContentsService) {}

  ngOnInit() {
    const headers$ = this.tocService.tocContent$.pipe(
      map((headers) =>
        headers.filter((header) => header.lvl == 2 || header.lvl == 3)
      ),
      tap((headers) => (this.headers = headers)),
      map((headers) => (this.limit ? headers.slice(0, this.limit) : headers))
    );

    headers$.subscribe(this.filteredHeaders$);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["limit"]) {
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
}
