import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byWordOrSentance',
  standalone: true
})
export class ByWordOrSentancePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
