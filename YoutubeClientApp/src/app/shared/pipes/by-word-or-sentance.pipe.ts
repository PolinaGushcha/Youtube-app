import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../types/response';

@Pipe({
  name: 'byWordOrSentance',
  standalone: true
})
export class ByWordOrSentancePipe implements PipeTransform {

  transform(
    cards: Item[],
    searchText: string,
  ): Item[] {
    if (searchText) {
      return cards.filter(item => {
        return item.snippet.title.includes(searchText);
      });
    } else return cards;
  }

}
