import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFavoriteCards } from './state.models';

export const selectFavoriteCards = createFeatureSelector<IFavoriteCards>('favoriteCards');
export const selectAllFavoriteCards = createSelector(
  selectFavoriteCards,
  (cardObj: IFavoriteCards) => cardObj.favoriteCards
);
export const selectFavoriteCardById = (id: string) =>
  createSelector(selectFavoriteCards, (state: IFavoriteCards) => state.favoriteCards.find(card => card.id === id));
