import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardItem } from '../../model/card-item';

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.paginatedItems = this.items?.slice(0, this.PAGE_SIZE);
    }
  }

  loadMoreItems(): void {
    this.paginatedItems = this.items.slice(
      0,
      this.paginatedItems.length + this.PAGE_SIZE
    );
  }
}
