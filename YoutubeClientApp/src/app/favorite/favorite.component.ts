import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ICardObj } from '../redux/state.models';
import { Router } from '@angular/router';
import { GetBorderColorService } from '../layout/services/get-border-color.service';
import { cardsListActions } from '../redux/cards.actions';
import { HeartComponent } from '../assets/heart/heart.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, HeartComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent {
  public cards$: Observable<ICardObj[]>;

  constructor(
    private router: Router,
    private borderService: GetBorderColorService,
    private store: Store<{ cardState: ICardObj[] }>
  ) {
    this.cards$ = this.store.select('cardState');
  }

  getColorClass(date: string | undefined): string {
    return this.borderService.getColorClass(date);
  }

  navigateToRoute(id: string) {
    this.router.navigateByUrl(`layout/item/${id}`);
  }

  removeCard(id: string) {
    this.store.dispatch(cardsListActions.deleteCard({ id }));
  }
}
