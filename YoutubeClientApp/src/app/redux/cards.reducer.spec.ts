import { initialState, cardsReducer } from './cards.reducer';
import * as CardAction from './cards.actions';
import { ICardObj } from './state.models';

describe('Card reducer', () => {
  const newState: ICardObj[] = [
    {
      id: '1',
      title: 'Title',
      description: 'description',
      imgLink: 'imgLink',
      videoLink: 'videoLink',
      creationDate: 'creationDate',
      statistics: {
        commentCount: '1',
        favoriteCount: 'favoriteCount',
        likeCount: '2',
        viewCount: '3',
      },
      isLiked: true,
    },
  ];
  it('return initial State', () => {
    const action = { type: 'Unknown' };
    const state = cardsReducer.reducer(initialState, action);

    expect(state).toEqual([]);
  });

  it('adds Card to State', () => {
    const action = CardAction.cardsListActions.addCard({ card: newState[0] });
    const state = cardsReducer.reducer(initialState, action);
    expect(state).toEqual(newState);
  });

  // it('get Card to State', () => {
  //   const action = CardAction.cardsListActions.loadCard();
  //   const state = cardsReducer.reducer(newState, action);
  //   expect(state).toEqual(newState);
  // });

  it('remove Card from State', () => {
    const action = CardAction.cardsListActions.deleteCard({ id: '1' });
    const state = cardsReducer.reducer(newState, action);
    expect(state).toEqual([]);
  });
});
