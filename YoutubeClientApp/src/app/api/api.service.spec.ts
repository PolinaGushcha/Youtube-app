import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
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

  describe('tests http getYoutubeApiVideos("angular") request', () => {
    it('shuld have correct params getYoutubeApiVideos("angular")', async () => {
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

    it('throw an error if the getYoutubeApiVideos() request fail', () => {
      let actualError: HttpErrorResponse | undefined;
      service.getYoutubeApiVideos('Angular').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: err => {
          actualError = err;
        },
      });
      const req = http.expectOne(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&type=video&q=Angular&maxResults=30'
      );
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible error',
      });
      if (!actualError) {
        throw new Error('Error should be defined');
      }
      expect(actualError?.status).toBe(422);
      expect(actualError?.statusText).toBe('Unprocessible error');
    });
  });

  describe('tests http getVideoStatistic(id) request', () => {
    it('shuld have correct params', async () => {
      const id = 'ID_string_getVideoStatistic';
      const requestStatUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=ID_string_getVideoStatistic';
      const responseExample = [{ id: '1', statistic: 'foo' }];
      const stat$ = service.getVideoStatistic(id);
      const statePromise = firstValueFrom(stat$);
      const req = http.expectOne(requestStatUrl, 'Http stat mock');
      expect(req.request.method).toEqual('GET');
      req.flush(responseExample);
      expect(await statePromise).toEqual(responseExample);
    });

    it('throw an error if the getVideoStatistic() request fail', () => {
      let actualError: HttpErrorResponse | undefined;
      service.getVideoStatistic('id').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: err => {
          actualError = err;
        },
      });
      const req = http.expectOne(
        'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=id',
        'Error of getVideoStatistic'
      );
      req.flush('Sserver error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });
      if (!actualError) {
        throw new Error('Error should be defined');
      }
      expect(actualError?.status).toBe(422);
      expect(actualError?.statusText).toBe('Unprocessible entity');
    });
  });

  describe('tests http getYoutubeApiItem(id)', () => {
    it('shuld have correct params getYoutubeApiItem(id).subscribe()', async () => {
      const id = 'ID_string';
      const requestVideoUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=ID_string';
      const videoResponse = [{ id: '1', videoName: 'foo' }];
      // const video$ = service.getYoutubeApiItem(id);
      // const videoPromise = firstValueFrom(video$);
      // const req = http.expectOne(requestVideoUrl, 'check out getYoutubeApiItem() url');
      // expect(req.request.method).toBe('GET');
      // req.flush(videoResponse);
      // expect(await videoPromise).toEqual(videoResponse);
      let item: unknown | undefined;
      service.getYoutubeApiItem(id).subscribe(response => {
        item = response;
      });
      const req = http.expectOne(requestVideoUrl, 'check out getYoutubeApiItem() url');
      expect(req.request.method).toEqual('GET');
      req.flush(videoResponse);
      expect(item).toEqual([{ id: '1', videoName: 'foo' }]);
      // expect(req.request.body).toEqual({body: name}); // When POST
    });

    it(' Error getYoutubeApiItem() request', () => {
      let actualError: HttpErrorResponse | undefined;
      service.getYoutubeApiItem('idItem').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: err => {
          actualError = err;
        },
      });
      const req = http.expectOne(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=idItem',
        'Http url controll'
      );
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessible entity',
      });
      if (!actualError) {
        throw new Error('Error needs to be defined');
      }
      expect(actualError.status).toBe(422);
      expect(actualError.statusText).toBe('Unprocessible entity');
    });
  });
});
