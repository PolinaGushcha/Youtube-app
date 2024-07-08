import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countOfViews',
  standalone: true
})
export class CountOfViewsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
