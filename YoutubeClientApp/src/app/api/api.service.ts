import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

export enum ApiPartEnum {
  snippet = 'snippet',
  statistics = 'statistics',
}

export enum ApiResourceEnum {
  search = 'search',
  videos = 'videos',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // public apiResource = ['search', 'videos'];
  public baseApiUrl = environment.BASE_API_URL;
  // public apiPart = ['snippet', 'statistics'];
  public apiKey = environment.API_KEY;
  // public apiKey = 'AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM';
  public apiType = 'video';
  public apiQ = '';
  public apiId = '';
  // public apiMaxResults = 30;
  public apiMaxResults = environment.API_MAX_RESULT;

  getYoutubeApiVideos(value?: string) {
    const urlParams = new HttpParams()
      .set('part', ApiPartEnum.snippet)
      .set('key', this.apiKey)
      .set('type', this.apiType)
      .set('q', value || this.apiQ)
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
    const urlParams = new HttpParams().set('part', 'snippet').set('key', this.apiKey).set('id', id);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${ApiResourceEnum.videos}`, options);
  }
}
