import { TestBed } from '@angular/core/testing';
import { IDetailsItem, IResponseVideos } from '../types/response';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // проверяем, что нет незакрытых запросов
  });

  it('creates a service', () => {
    expect(apiService).toBeTruthy();
  });

  describe('api calls', () => {
    it('should return object as IResponseVideos', () => {
      const mockData: IResponseVideos | undefined = {
        etag: 'etag123',
        items: [],
        kind: 'youtube#searchListResponse',
        nextPageToken: 'token123',
        pageInfo: {
          resultsPerPage: 5,
          totalResults: 100,
        },
        regionCode: 'US',
      };
      apiService.getYoutubeApiVideos().subscribe(res => {
        expect(res).toEqual(mockData);
      });
      const params = new HttpParams()
        .set('part', 'snippet')
        .set('key', apiService.apiKey)
        .set('type', 'video')
        .set('q', '')
        .set('maxResults', 30);
      const req = httpTestingController.expectOne(`${apiService.baseApiUrl}search?${params.toString()}`);
      req.flush(mockData);
      expect(req.request.method).toBe('GET');
    });

    it('should return object as IDetailsItem', () => {
      const mockData: IDetailsItem = {
        kind: 'youtube#videoListResponse',
        etag: '1uwEdADcLZEyCYvE-NVP0C0GE_w',
        items: [],
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 1,
        },
      };
      apiService.getVideoStatistic('j6bfqIBv5jc').subscribe(response => {
        expect(response).toEqual(mockData);
      });
      const params = new HttpParams().set('part', 'statistics').set('key', apiService.apiKey).set('id', 'j6bfqIBv5jc');
      const req = httpTestingController.expectOne(`${apiService.baseApiUrl}videos?${params.toString()}`);
      req.flush(mockData);
      expect(req.request.method).toBe('GET');
    });

    it('should return object as IDetailsItem', () => {
      const mockData: IDetailsItem = {
        kind: 'youtube#videoListResponse',
        etag: '1uwEdADcLZEyCYvE-NVP0C0GE_w',
        items: [],
        pageInfo: {
          totalResults: 1,
          resultsPerPage: 1,
        },
      };
      apiService.getYoutubeApiItem('j6bfqIBv5jc').subscribe(response => {
        expect(response).toEqual(mockData);
      });
      const params = new HttpParams().set('part', 'snippet').set('key', apiService.apiKey).set('id', 'j6bfqIBv5jc');
      const req = httpTestingController.expectOne(`${apiService.baseApiUrl}videos?${params.toString()}`);
      req.flush(mockData);
      expect(req.request.method).toBe('GET');
    });
  });
});
