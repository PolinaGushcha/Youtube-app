export enum todoActionsType {
  add = '[Favorite] add item',
  delete = '[Favorite] delete item',
  load = '[Favorite] load item',
}

export interface ICardObj {
  id: string;
  title: string;
  description: string;
  imgLink: string;
  videoLink: string;
  creationDate: string;
}

export interface IFavoriteCards {
  favoriteCards: ICardObj[];
}
