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

  public sortType: ISortObj  = {
    sortByDate: false,
    dateUp: false,
    countOfViews: false,
    countOfViewsUp: false,
    byWordOrSentance: false,
    byWordOrSentanceText: '',
  }
  onSortObj (str: string) {
    switch (str) {
      case 'date': this.sortType.sortByDate = !this.sortType.sortByDate;
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
