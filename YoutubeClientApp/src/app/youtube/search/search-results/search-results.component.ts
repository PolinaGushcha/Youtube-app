import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ISortObj } from '../../../types/sorting';
import { Item } from '../../../types/response';
import { GetBorderColorService } from '../../services/get-border-color.service';
import { SortByDatePipe } from '../../../shared/pipes/sort-by-date.pipe';
import { CountOfViewsPipe } from '../../../shared/pipes/count-of-views.pipe';
import { ByWordOrSentancePipe } from '../../../shared/pipes/by-word-or-sentance.pipe';
import * as data from "../../../assets/response.json"

@Component({
    selector: 'app-search-results',
    standalone: true,
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss',
    imports: [FormsModule, CommonModule, SortByDatePipe, CountOfViewsPipe, ByWordOrSentancePipe]
})
export class SearchResultsComponent implements OnChanges {

  public cards: Item[] = [];

  public showSearchResultsComponent = false;

  public borderService = inject(GetBorderColorService);

  public sortObject: ISortObj = {
    sortByDate: false,
    sortByDateUp: false,
    countOfViews: false,
    countOfViewsUp: false,
    byWordOrSentance: false,
    byWordOrSentanceText: '',
  }

  @Input() filterDataByText = "";

  @Input() sortType = "";

  @Input() upAndDownIsAvaliable = false;



  constructor(private router: Router) {}


  
  ngOnChanges(changes: SimpleChanges): void {
    if( changes["filterDataByText"]) {
      this.getCardsValues();
    }
    if ( changes["sortType"]) {
      this.getSortType(this.sortType);
    }
    if ( changes["upAndDownIsAvaliable"]) {
      this.getArrowType(this.upAndDownIsAvaliable);
    }
  }

  getCardsValues () {
    this.cards = data.items.filter(el => el.snippet.title.toLocaleLowerCase().includes(this.filterDataByText.toLocaleLowerCase()));
  }

  getSortType (str: string) {
      switch (str) {
        case 'date': this.sortObject.sortByDate = !this.sortObject.sortByDate;
        this.sortObject.countOfViews = false;
        this.sortObject.byWordOrSentance = false;
        break;
        case 'countOfViews': 
        this.sortObject.sortByDate = false;
        this.sortObject.countOfViews = !this.sortObject.countOfViews;
        this.sortObject.byWordOrSentance = false;
        break;
        case 'byWordOrSentance': 
        this.sortObject.sortByDate = false ;
        this.sortObject.countOfViews = false;
        this.sortObject.byWordOrSentance = !this.sortObject.byWordOrSentance; break;
      }
      return this.sortObject
  }
     
  getArrowType (value: boolean) {
    switch (true) {
      case (this.sortObject.sortByDate): 
      this.sortObject.sortByDateUp = value;
      this.sortObject.countOfViewsUp = false;
      break;
      case (this.sortObject.countOfViews): 
      this.sortObject.sortByDateUp = false;
      this.sortObject.countOfViewsUp = value;
      break;
      default: 
      this.sortObject.sortByDateUp = false;
      this.sortObject.countOfViewsUp = false;
      break;
    }
    return value
  }

  navigateToRoute(itemData: string) {
    this.router.navigate(["/search-item", itemData])
  }

  getColorClass (date: string | undefined): string {
    return this.borderService.getColorClass(date)
  }

}
