import { IStatistic } from '../types/response';

export enum cardsActionsType {
  add = 'add card',
  delete = 'delete card',
  load = 'load card',
}

export interface ICardObj {
  id: string;
  title: string;
  description: string;
  imgLink: string;
  videoLink: string;
  creationDate: string;
  statistics: IStatistic;
  isLiked?: boolean;
}
