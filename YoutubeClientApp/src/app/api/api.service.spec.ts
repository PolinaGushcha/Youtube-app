import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

describe('HTTPVideosService', () => {
  let service: ApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tests http getYoutubeApiVideos(angular) request', () => {
    it('shuld have correct params', async () => {
      const searchString = 'angular';
      const responseExample = [{ id: '1', name: 'foo' }];
      const url =
        'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&type=video&q=angular&maxResults=30';
      const vedeo$ = service.getYoutubeApiVideos(searchString);
      const videoPromise = firstValueFrom(vedeo$);
      const req = http.expectOne(url, 'Http video mock');
      expect(req.request.method).toEqual('GET');
      req.flush(responseExample);
      expect(await videoPromise).toEqual(responseExample);
    });
  });

  describe('tests http getVideoStatistic(id) request', () => {
    it('shuld have correct params', async () => {
      const id = 'ID_string';
      const requestStat =
        'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=ID_string';
      const responseExample = [{ id: '1', statistic: 'foo' }];
      const stat$ = service.getVideoStatistic(id);
      const statePromise = firstValueFrom(stat$);
      const req = http.expectOne(requestStat, 'Http stat mock');
      expect(req.request.method).toEqual('GET');
      req.flush(responseExample);
      expect(await statePromise).toEqual(responseExample);
    });
  });
});
