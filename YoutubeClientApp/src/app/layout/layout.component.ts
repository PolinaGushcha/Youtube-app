import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { HeaderComponent } from '../header/header.component';
import { IData } from '../types/response';
import { GetBorderColorService } from './services/get-border-color.service';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { ICardObj } from '../redux/state.models';
import { addFavoriteItem } from '../redux/cards.actions';

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

  public showItemComponent = true;
  public showFavoriteComponent = false;
  public showCreateCardComponent = false;

  public sortType = '';
  public upAndDownIsAvaliable = false;

  public store = inject(Store);

  constructor(
    private router: Router,
    private borderService: GetBorderColorService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showItemComponent = !this.router.url.includes('item');
        this.showFavoriteComponent = this.router.url.includes('favorite');
        this.showCreateCardComponent = this.router.url.includes('create-card');
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

  getSortType(text: string) {
    this.sortType = text;
  }

  getUpAndDownArrow(value: boolean) {
    this.upAndDownIsAvaliable = value;
  }

  addFavoriteCard(card: IData) {
    const newCard: ICardObj = {
      id: uuidv4(),
      title: card.snippet.title,
      description: card.snippet.description,
      imgLink: card.snippet.thumbnails.medium.url,
      videoLink: card.id.videoId,
      creationDate: card.snippet.publishAt,
    };
    this.store.dispatch(addFavoriteItem({ card: newCard }));
    console.log(newCard);
  }
}

// *ngFor="
// let card of data
// | sortByDate: sortObject.sortByDate : sortObject.sortByDateUp
// | countOfViews: sortObject.countOfViews : sortObject.countOfViewsUp
// | byWordOrSentance: sortObject.byWordOrSentance : sortObject.byWordOrSentanceText
// "
