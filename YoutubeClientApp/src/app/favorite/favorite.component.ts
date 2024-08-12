import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllFavoriteCards } from '../redux/cards.selectors';
import { CommonModule } from '@angular/common';
import { ICardObj } from '../redux/state.models';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
})
export class FavoriteComponent implements OnInit {
  public favoriteCards$: Observable<ICardObj[]>;

  constructor(private store: Store) {
    this.favoriteCards$ = this.store.select(selectAllFavoriteCards);
  }

  ngOnInit(): void {
    console.log(this.favoriteCards$);
  }
}
