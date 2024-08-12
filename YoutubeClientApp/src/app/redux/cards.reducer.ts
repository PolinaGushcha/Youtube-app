import { createReducer, on } from '@ngrx/store';
import { addFavoriteItem, deleteFavoriteItem } from './cards.actions';
import { IFavoriteCards } from './state.models';

const initialState: IFavoriteCards = { favoriteCards: [] };

export const favotiteReducer = createReducer(
  initialState,
  on(addFavoriteItem, (state, { card }) => ({
    // ...state,
    favoriteCards: [...state.favoriteCards, card],
  })),
  on(deleteFavoriteItem, (state, { id }) => ({
    // ...state,
    favoriteCards: [...state.favoriteCards.filter(el => el.id === id)],
  }))
);
