import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { cardsListActions } from './cards.actions';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions) {}

  addCard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardsListActions.addCard),
        map(action => {
          return action;
        }),
        catchError(() => of({ type: '[Card] Add Card Error' }))
      ),
    { dispatch: false }
  );

  removeCard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(cardsListActions.deleteCard),
        map(action => {
          return action;
        }),
        catchError(() => of({ type: '[Card] Remove Card Error' }))
      ),
    { dispatch: false }
  );
}
