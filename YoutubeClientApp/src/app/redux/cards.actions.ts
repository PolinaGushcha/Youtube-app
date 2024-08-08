import { createAction, props } from '@ngrx/store';
import { ICardObj, todoActionsType } from './state.models';

export const addFavoriteItem = createAction(todoActionsType.add, props<{ card: ICardObj }>());
export const deleteFavoriteItem = createAction(todoActionsType.delete, props<{ id: string }>());
export const loadFavoriteItem = createAction(todoActionsType.load, props<{ url: string }>());
