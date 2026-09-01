import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICardObj } from './state.models';

export const selectFavoriteCards = createFeatureSelector<ICardObj[]>('cardsList');
export const selectAllFavoriteCards = createSelector(selectFavoriteCards, (cardObj: ICardObj[]) => cardObj);
export const selectCardById = (id: string) =>
  createSelector(selectFavoriteCards, (state: ICardObj[]) => state.find(card => card.id === id));
