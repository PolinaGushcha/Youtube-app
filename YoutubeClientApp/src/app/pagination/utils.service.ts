import { Injectable } from '@angular/core';

type T = number | string;

@Injectable()
export class UtilsService {
  range = (start: number, end: number): number[] => {
    return [...Array(end - start).keys()].map(el => el + start);
  };

  pluck = (elements: T[], field: keyof T) => {
    return elements.map(el => el[field]);
  };
}
