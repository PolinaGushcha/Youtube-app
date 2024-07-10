import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../../types/response';

@Pipe({
  name: 'byWordOrSentance',
  standalone: true
})
export class ByWordOrSentancePipe implements PipeTransform {

  transform(
    cards: Item[],
    isAvailable: boolean,
    searchText: string,
  ): Item[] {
    const copyOfCards: Item[] = [...cards];
    if (isAvailable) {
      if (searchText) {
        return copyOfCards.filter(item => {
          return item.snippet.title.includes(searchText);
        });
      } else return copyOfCards;
    } else return copyOfCards;
  }

}
