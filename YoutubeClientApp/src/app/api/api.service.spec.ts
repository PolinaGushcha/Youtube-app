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

  describe('tests http request', () => {
    it('should works getYoutubeApiVideos(angular)', async () => {
      const searchString = 'angular';
      const responseExample = [{ id: '1', name: 'foo' }];
      const url =
        'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&type=video&q=angular&maxResults=30';
      const vedeo$ = service.getYoutubeApiVideos(searchString);
      const videoPromise = firstValueFrom(vedeo$);
      const req = http.expectOne(url, 'Http mock');
      expect(req.request.method).toEqual('GET');
      req.flush(responseExample);
      expect(await videoPromise).toEqual(responseExample);
    });
  });
});
