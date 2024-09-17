import { cardsReducer, initialState } from './cards.reducer';
import { cardsListActions } from './cards.actions';
import { ICardObj } from './state.models';
import { Action } from '@ngrx/store';

describe('YourReducer', () => {
  const initialStateWithCards: ICardObj[] = [
    {
      id: '1',
      title: 'title',
      description: 'description',
      imgLink: 'imgLink',
      videoLink: 'videoLink',
      creationDate: 'creationDate',
      statistics: {
        commentCount: '1',
        favoriteCount: '1',
        likeCount: '1',
        viewCount: '1',
      },
      isLiked: true,
    },
  ];
  it('should return the initial state when no action is passed', () => {
    const action = {};
    const state = cardsReducer.reducer(undefined, action as Action);
    expect(state).toBe(initialState);
  });

  it('should handle an addCard action', () => {
    const action = cardsListActions.addCard({ card: {} as ICardObj });
    const expectedState = [{}];
    const state = cardsReducer.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it('should handle an deleteCard action', () => {
    const action = cardsListActions.deleteCard({ id: '1' });
    const state = cardsReducer.reducer(initialStateWithCards, action);
    expect(state).toEqual(initialState);
  });

  it('should handle an loadCard action', () => {
    const action = cardsListActions.loadCard();
    const state = cardsReducer.reducer(initialState, action);
    expect(state).toEqual({ ...initialState });
  });
});
