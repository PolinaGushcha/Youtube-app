import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../types/response';

@Pipe({
  name: 'countOfViews',
  standalone: true
})
export class CountOfViewsPipe implements PipeTransform {

  transform(
    cards: Item[],
    isAvailable: boolean,
    up: boolean,
  ): Item[] {
    const copyOfCards: Item[] = [...cards]
    if (isAvailable) {
      const sortCards = copyOfCards.sort(
        (a, b) =>
          +new Date(a.statistics.viewCount) - +new Date(b.statistics.viewCount),
      );
      if (up) return sortCards;
      else return sortCards.reverse();
    } else return copyOfCards;
  }

}
