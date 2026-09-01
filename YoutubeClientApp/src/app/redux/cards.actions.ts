import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICardObj, cardsActionsType } from './state.models';

export const cardsListActions = createActionGroup({
  source: 'cardsList',
  events: {
    [cardsActionsType.add]: props<{ card: ICardObj }>(),
    [cardsActionsType.delete]: props<{ id: string }>(),
    [cardsActionsType.load]: emptyProps(),
  },
});
