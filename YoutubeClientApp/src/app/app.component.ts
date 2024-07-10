import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { SearchItemComponent } from './youtube/pages/search/search-item/search-item.component';
import { SearchResultsComponent } from './youtube/pages/search/search-results/search-results.component';
import {RouterModule} from '@angular/router';
import { ISortObj } from './types/response';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, RouterOutlet, HeaderComponent, SearchResultsComponent, SearchItemComponent]
})
export class AppComponent {
  public messageText?: string;
  getSerchingText(message: string | undefined) {
    this.messageText = message
  }
  title = 'YoutubeClientApp';

  public inputVal = "inputVal"
  onTextSelected (text: string) {
    console.log('filter text: ' + text);
    this.inputVal = text;
  }
  public sortingVal = "sortingVal"
  onSortingText (text: string) {
    console.log('sorting text: ' + text);
    this.sortingVal = text;
  }

  public upAndDownArrow = false;
  onUpAndDown (value: boolean) {
    this.upAndDownArrow = value
    switch (true) {
      case (this.sortType.sortByDate): 
      this.sortType.dateUp = value;
      this.sortType.countOfViewsUp = false;
      break;
      case (this.sortType.countOfViews): 
      this.sortType.dateUp = false;
      this.sortType.countOfViewsUp = value;
      break;
      default: 
      this.sortType.dateUp = false;
      this.sortType.countOfViewsUp = false;
      break;
    }
    return value
  }

  public sortType: ISortObj  = {
    sortByDate: false,
    dateUp: this.upAndDownArrow,
    countOfViews: false,
    countOfViewsUp: false,
    byWordOrSentance: false,
    byWordOrSentanceText: '',
  }
  onSortObj (str: string) {
    switch (str) {
      case 'date': this.sortType.sortByDate = !this.sortType.sortByDate;
      this.sortType.dateUp = this.upAndDownArrow
      this.sortType.countOfViews = false;
      this.sortType.byWordOrSentance = false;
      break;
      case 'countOfViews': 
      this.sortType.sortByDate = false;
      this.sortType.countOfViews = !this.sortType.countOfViews;
      this.sortType.byWordOrSentance = false;
      break;
      case 'byWordOrSentance': 
      this.sortType.sortByDate = false ;
      this.sortType.countOfViews = false;
      this.sortType.byWordOrSentance = !this.sortType.byWordOrSentance; break;
    }
    console.log('obj: ');
    console.log(this.sortType)
    return this.sortType
  }
}
