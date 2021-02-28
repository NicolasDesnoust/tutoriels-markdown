import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface CardItem {
  title: string;
  header?: string;
  body: string;
  footer?: string;
  route: string;
  display? : 'none';
}

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnChanges {
  @Input() title: string;
  @Input() items: CardItem[];
  paginatedItems: CardItem[];
  private readonly PAGE_SIZE = 10;
  
  cardRippleDisabled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.paginatedItems = this.items?.slice(0, this.PAGE_SIZE);
    }
  }

  loadMoreItems() {
    this.paginatedItems = this.items.slice(
      0,
      this.paginatedItems.length + this.PAGE_SIZE
    );
  }
}
