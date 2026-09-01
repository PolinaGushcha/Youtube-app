export const environment = {
  BASE_API_URL: 'https://www.googleapis.com/youtube/v3/',
  API_KEY: 'AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM',
  API_MAX_RESULT: 32,
  ITEM_PER_PAGE: 8,
};

export enum ApiPartEnum {
  snippet = 'snippet',
  statistics = 'statistics',
}

export enum ApiResourceEnum {
  search = 'search',
  videos = 'videos',
}
