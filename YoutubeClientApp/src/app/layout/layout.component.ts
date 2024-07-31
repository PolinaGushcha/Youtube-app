import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { HeaderComponent } from '../header/header.component';
import { IData } from '../types/response';
import { GetBorderColorService } from './services/get-border-color.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, ItemComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public data?: IData[];
  public isLoading = false;

  public showComponent = true;

  constructor(
    private router: Router,
    private borderService: GetBorderColorService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showComponent = !this.router.url.includes('item');
        console.log(this.router.url.includes('item'));
      }
    });
  }

  getData(obj: IData[]) {
    this.data = obj;
  }

  getIsLoading(value: boolean) {
    this.isLoading = value;
  }

  getColorClass(date: string | undefined): string {
    return this.borderService.getColorClass(date);
  }

  navigateToRoute(id: string) {
    this.router.navigateByUrl(`layout/item/${id}`);
  }

  public sortType = '';

  public upAndDownIsAvaliable = false;

  getSortType(text: string) {
    this.sortType = text;
  }

  getUpAndDownArrow(value: boolean) {
    this.upAndDownIsAvaliable = value;
  }
}

// *ngFor="
// let card of data
// | sortByDate: sortObject.sortByDate : sortObject.sortByDateUp
// | countOfViews: sortObject.countOfViews : sortObject.countOfViewsUp
// | byWordOrSentance: sortObject.byWordOrSentance : sortObject.byWordOrSentanceText
// "
