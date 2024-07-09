import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../types/response';

@Pipe({
  name: 'countOfViews',
  standalone: true
})
export class CountOfViewsPipe implements PipeTransform {

  transform(
    cards: Item[],
    isAvailable: boolean,
  ): Item[] {
    if (isAvailable) {
      const sortCards = cards.sort(
        (a, b) =>
          +new Date(a.statistics.viewCount) - +new Date(b.statistics.viewCount),
      );
      return sortCards
    } else return cards;
  }

}
