import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPartEnum, ApiResourceEnum, environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public baseApiUrl = environment.BASE_API_URL;
  public apiKey = environment.API_KEY;
  public apiType = 'video';
  public apiQ = '';
  public apiId = '';
  public apiMaxResults = environment.API_MAX_RESULT;

  // used as a stand-in "random videos" feed when there's no search query,
  // since the YouTube Data API has no native random/discovery endpoint
  private randomTopics = [
    'music',
    'news',
    'gaming',
    'movie trailer',
    'sports',
    'comedy',
    'travel',
    'cooking',
    'science',
    'technology',
    'nature',
    'art',
    'fitness',
    'documentary',
    'animals',
  ];

  private getRandomTopic(): string {
    return this.randomTopics[Math.floor(Math.random() * this.randomTopics.length)];
  }

  getYoutubeApiVideos(value?: string) {
    const query = value || this.apiQ || this.getRandomTopic();
    const urlParams = new HttpParams()
      .set('part', ApiPartEnum.snippet)
      .set('key', this.apiKey)
      .set('type', this.apiType)
      .set('q', query)
      .set('maxResults', this.apiMaxResults);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${ApiResourceEnum.search}`, options);
  }

  getVideoStatistic(id: string) {
    const urlParams = new HttpParams().set('part', ApiPartEnum.statistics).set('key', this.apiKey).set('id', id);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${ApiResourceEnum.videos}`, options);
  }

  getYoutubeApiItem(id: string) {
    const urlParams = new HttpParams().set('part', ApiPartEnum.snippet).set('key', this.apiKey).set('id', id);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${ApiResourceEnum.videos}`, options);
  }
}
