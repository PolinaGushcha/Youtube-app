import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ItemComponent } from '../item/item.component';
import { HeaderComponent } from '../header/header.component';
import { IData } from '../types/response';
import { GetBorderColorService } from './services/get-border-color.service';
import { Store } from '@ngrx/store';
import { ICardObj } from '../redux/state.models';
import { v4 as uuidv4 } from 'uuid';
import { cardsListActions } from '../redux/cards.actions';
import { HeartComponent } from '../assets/heart/heart.component';
import { Observable } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, ItemComponent, HeaderComponent, HeartComponent, PaginationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public data = signal<IData[]>([]);
  public isLoading = signal(false);
  public cards$: Observable<ICardObj[]>;

  public showItemComponent = true;
  public showFavoriteComponent = false;
  public showCreateCardComponent = false;

  public sortType = '';
  public upAndDownIsAvaliable = false;
  public sortText = '';

  public itemsPerPage = 20;
  public currentPage = 1;

  constructor(
    private store: Store<{ cardState: ICardObj[] }>,
    private router: Router,
    private borderService: GetBorderColorService
  ) {
    this.cards$ = this.store.select('cardState');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showItemComponent = !this.router.url.includes('item');
        this.showFavoriteComponent = this.router.url.includes('favorite');
        this.showCreateCardComponent = this.router.url.includes('create-card');
      }
    });
  }

  ngOnInit() {
    this.cards$.subscribe(cards => {
      this.data.update(arr => {
        arr.forEach(el => (el.isLiked = false));
        return arr;
      });
      const arr: number[] = [];
      cards.forEach(({ id }) => {
        const likesIndex: number = this.data().findIndex(el => el.id.videoId === id);
        if (likesIndex !== -1) {
          arr.push(likesIndex);
        }
      });
      arr.forEach(el =>
        this.data.update(i => {
          i[el].isLiked = true;
          return i;
        })
      );
    });
  }

  getData(obj: IData[]) {
    const receivedData: IData[] = obj.map(el => {
      el.isLiked = false;
      return el;
    });
    this.data.set(receivedData);
  }

  getIsLoading(value: boolean) {
    this.isLoading.set(value);
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

  getSortText(text: string) {
    this.sortText = text;
  }

  addOrRemoveFavoriteCard(card: IData) {
    if (card.isLiked) {
      this.removeCard(card.id.videoId);
    } else {
      this.addCard(card);
    }
  }

  addCard(card: IData) {
    const newCard: ICardObj = {
      id: card.id.videoId || uuidv4(),
      title: card.snippet.title,
      description: card.snippet.description,
      imgLink: card.snippet.thumbnails.medium.url,
      videoLink: 'video-link',
      creationDate: card.snippet.publishedAt,
      statistics: {
        viewCount: card.items[0].statistics?.viewCount || '0',
        likeCount: card.items[0].statistics?.likeCount || '0',
        commentCount: card.items[0].statistics?.commentCount || '0',
      },
      isLiked: true,
    };
    this.store.dispatch(cardsListActions.addCard({ card: newCard }));
  }

  removeCard(id: string) {
    this.store.dispatch(cardsListActions.deleteCard({ id }));
  }

  private compareItems(a: IData, b: IData): number {
    let result = 0;
    if (this.sortType === 'date') {
      result = new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime();
    } else if (this.sortType === 'countOfViews') {
      result = Number(a.items[0].statistics?.viewCount || 0) - Number(b.items[0].statistics?.viewCount || 0);
    }
    return this.upAndDownIsAvaliable ? -result : result;
  }

  get sortedItems(): IData[] {
    const items = [...this.data()];

    if (this.sortType === 'byWordOrSentance') {
      const text = this.sortText.trim().toLowerCase();
      if (!text) return items;
      return items.filter(
        el => el.snippet.title.toLowerCase().includes(text) || el.snippet.description.toLowerCase().includes(text)
      );
    }

    if (this.sortType === 'date' || this.sortType === 'countOfViews') {
      return items.sort((a, b) => this.compareItems(a, b));
    }

    return items;
  }

  get paginatedItems(): IData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.sortedItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
  }
}
