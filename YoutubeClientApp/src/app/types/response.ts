export interface IData {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  items: ICard[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  snippet: {
    publishAt: string;
    publishTime: string;
    channelId: string;
    title: string;
    description: string;
    liveBroadcastContent: string;
    channelTitle: string;
    thumbnails: IThumbnails;
  };
  isLiked?: boolean;
}

export interface ICard {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  statistics?: IStatistic;
}

export interface IStatistic {
  commentCount: string;
  favoriteCount?: string;
  likeCount: string;
  viewCount: string;
}

export interface IThumbnails {
  default: IQuality;
  high: IQuality;
  medium: IQuality;
}

export interface IQuality {
  url: string;
  width: number;
  height: number;
}

export interface IResponseVideos {
  etag: string;
  items: IResponseItem[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
  regionCode: string;
}

export interface IResponseItem {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    publishAt: string;
    publishTime: string;
    channelId: string;
    title: string;
    description: string;
    liveBroadcastContent: string;
    channelTitle: string;
    thumbnails: IThumbnails;
  };
}

export interface IDetailsItem {
  etag: string;
  items: IData[] | ICard[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
