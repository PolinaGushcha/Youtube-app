import { createFeature, createReducer, on } from '@ngrx/store';
import { cardsListActions } from './cards.actions';
import { ICardObj } from './state.models';

export const initialState: ICardObj[] = [];

export const cardsReducer = createFeature({
  name: 'cardsList',
  reducer: createReducer(
    initialState,
    on(cardsListActions.addCard, (state, { card }) => [...state, card]),
    on(cardsListActions.deleteCard, (state, { id }) => [...state.filter(el => el.id !== id)]),
    on(cardsListActions.loadCard, state => ({
      ...state,
    }))
  ),
});
