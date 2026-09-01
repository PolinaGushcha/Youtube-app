import { selectAllFavoriteCards, selectCardById } from './cards.selectors';
import { ICardObj } from './state.models';

describe('Cards Selectors', () => {
  const mockState: ICardObj[] = [
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

  it('should select all favorite cards', () => {
    const result = selectAllFavoriteCards.projector(mockState);
    expect(result.length).toBe(1);
    expect(result).toEqual(mockState);
  });

  it('should select a card by id', () => {
    const cardId = '1';
    const result = selectCardById(cardId).projector(mockState);
    expect(result).toEqual(mockState[0]);
  });

  it('should return undefined if card is not found by id', () => {
    const cardId = '999';
    const result = selectCardById(cardId).projector(mockState);
    expect(result).toBeUndefined();
  });
});
