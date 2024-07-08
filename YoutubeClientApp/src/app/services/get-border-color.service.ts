import { Injectable } from '@angular/core';
import { differenceInDays } from 'date-fns';
import * as data from '../assets/response.json'

@Injectable({
  providedIn: 'root'
})
export class GetBorderColorService {

  // constructor() { }

  public getColorClass (date: string | undefined): string {
    const currentDate = new Date();
    if (date) {
      const targetDate = new Date(date);
      const days: number = differenceInDays(currentDate, targetDate);
      
      switch(true) {
        case (days < 7): return "color-blue"; 
        case (days < 30): return "color-green";
        case (days < 180): return "color-yellow";
        case (days >= 180): return "color-red";
        default: return "color-blue";
      }
    } else {
      return "color-blue";
    }
  }

  public generalData = data.items;


  public filterObj (filterText: string | undefined) {
    if (!filterText) {
      this.generalData = data.items
    } else { 
      this.generalData = data.items.filter(el => el.snippet.title.includes(filterText));
    }
    console.log(this.generalData)
    // console.log(filterText)
  }
}
