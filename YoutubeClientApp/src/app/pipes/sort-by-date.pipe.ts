import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../types/response';

@Pipe({
  name: 'sortByDate',
  standalone: true
})
export class SortByDatePipe implements PipeTransform {

  transform(
    cards: Item[],
    isAvailable: boolean,
    up: boolean,
  ): Item[] {
    if (isAvailable) {
      const sortCards = cards.sort(
        (a, b) =>
          +new Date(a.snippet.publishedAt) - +new Date(b.snippet.publishedAt),
      );
      if (up) return sortCards;
      else return sortCards.reverse();
    } else return cards;
  }

}
