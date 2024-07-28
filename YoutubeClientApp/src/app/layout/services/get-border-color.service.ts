import { Injectable } from '@angular/core';
import { differenceInDays } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class GetBorderColorService {

  getColorClass (date: string | undefined): string {
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
}
