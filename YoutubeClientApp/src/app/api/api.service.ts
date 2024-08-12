import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public apiResource = ['search', 'videos'];
  public baseApiUrl = 'https://www.googleapis.com/youtube/v3/';
  public apiPart = ['snippet', 'statistics'];
  public apiKey = 'AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM';
  public apiType = 'video';
  public apiQ = '';
  public apiId = '';
  public apiMaxResults = 10;

  getYoutubeApiVideos(value?: string) {
    const urlParams = new HttpParams()
      .set('part', this.apiPart[0])
      .set('key', this.apiKey)
      .set('type', this.apiType)
      .set('q', value || this.apiQ)
      .set('maxResults', this.apiMaxResults);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${this.apiResource[0]}`, options);
  }

  getVideoStatistic(value: string) {
    const urlParams = new HttpParams().set('part', this.apiPart[1]).set('key', this.apiKey).set('id', value);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${this.apiResource[1]}`, options);
  }

  getYoutubeApiItem(id: string) {
    const urlParams = new HttpParams().set('part', 'snippet').set('key', this.apiKey).set('id', id);
    const options = { params: urlParams };
    return this.http.get(`${this.baseApiUrl}${this.apiResource[1]}`, options);
  }
}
