import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterModule, RouterOutlet]
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