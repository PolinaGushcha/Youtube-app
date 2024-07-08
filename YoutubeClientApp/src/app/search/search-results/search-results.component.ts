import { Component } from '@angular/core';
import * as cardsData from "../../assets/response.json"
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../types/response';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  constructor(private router: Router) {}

  public data:Item[] = cardsData.items;

  navigateToRoute(itemData: string) {
    this.router.navigate(['/search-item', itemData])
  }

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
}
