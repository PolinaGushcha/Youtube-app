import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { SearchItemComponent } from './youtube/pages/search/search-item/search-item.component';
import { SearchResultsComponent } from './youtube/pages/search/search-results/search-results.component';
import {RouterModule} from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, RouterOutlet, HeaderComponent, SearchResultsComponent, SearchItemComponent]
})
export class AppComponent {

  title = 'YoutubeClientApp';

  public filterDataByText = "filterDataByText"

  public sortType = '';

  public upAndDownIsAvaliable = false;


  
  getFilterDataByText (text: string) {
    this.filterDataByText = text;
  }

  getSortType (text: string) {
    this.sortType = text;
  }
  
  getUpAndDownArrow (value: boolean) {
      this.upAndDownIsAvaliable = value
  }
}