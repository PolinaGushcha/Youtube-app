import { ApiService } from './api.service';
import { environment } from '../../environments/environment.development';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ApiPartEnum, ApiResourceEnum } from '../../environments/environment';

describe('HTTPVideosService', () => {
  let service: ApiService;
  let http: HttpTestingController; // Controller to be injected into tests, that allows for mocking and flushing of requests
  const maxResults = environment.API_MAX_RESULT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(), // Configures Angular's HttpClient service to be available for injection.
        provideHttpClientTesting(), // By using it provideHttpClientTesting(), you replace the real HttpClient with HttpTestingController, allowing you to mock and control HTTP requests. This way, you can verify how your services handle HTTP requests and responses without an actual network call
      ],
    });

    service = TestBed.inject(ApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // afterEach runs after each individual test case ('it' block) in the test suite. Using afterEach ensures that the code inside this block will be executed consistently after every test, providing a clean-up mechanism.
    http.verify(); // The verify() method of HttpTestingController checks if there are any outstanding HTTP requests that haven’t been resolved or completed by the end of the test.
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Checks If the service instance is "truthy" (not null, undefined, or otherwise falsy). If service exists, it means the service was successfully created, and the test will pass. If not, the test will fail, indicating a problem with the service initialization.
  });

  describe('tests http getYoutubeApiVideos("angular") request', () => {
    it('should have correct params getYoutubeApiVideos("angular")', async () => {
      const searchString = 'angular';
      const responseExample = [{ id: '1', name: 'foo' }];
      const url = `${environment.BASE_API_URL}${ApiResourceEnum.search}?part=${ApiPartEnum.snippet}&key=${environment.API_KEY}&type=video&q=${searchString}&maxResults=${maxResults}`;
      const vedeo$ = service.getYoutubeApiVideos(searchString); // $ - эта переменная содержит Observable
      const videoPromise = firstValueFrom(vedeo$); // Converts an observable to a promise by subscribing to the observable, and returning a promise that will resolve as soon as the first value arrives from the observable. The subscription will then be closed.
      const req = http.expectOne(url, 'Http video mock'); // expectOne - Expect that a single request has been made which matches the given URL, and return its mock. If no such request has been made, or more than one such request has been made, fail with an error message.
      expect(req.request.method).toEqual('GET'); // Checks that the intercepted request’s HTTP method is GET, ensuring the request type matches what’s expected.
      req.flush(responseExample); // Sends responseExample as the mock response to the intercepted request. This mimics a real HTTP response from the server.
      expect(await videoPromise).toEqual(responseExample);
    });

    it('throw an error if the getYoutubeApiVideos() request fail', () => {
      let actualError: HttpErrorResponse | undefined; // A response that represents an error or failure, either from a non-successful HTTP status, an error while executing the request, or some other failure which occurred during the parsing of the response.

      service.getYoutubeApiVideos('Angular').subscribe({
        next: () => {
          fail('Success should not be called'); // Fails a test when called within one.
        },
        error: err => {
          actualError = err;
        },
      });
      const req = http.expectOne(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&type=video&q=Angular&maxResults=${maxResults}`
      );
      req.flush('Server error', {
        status: 422, // This error code stands for "Unsupported Content" and means that the server was unable to process the request because the request contained invalid or invalid content.
        statusText: 'Unprocessable error',
      });
      if (!actualError) {
        throw new Error('Error should be defined');
      }
      expect(actualError?.status).toBe(422);
      expect(actualError?.statusText).toBe('Unprocessable error');
    });
  });

  describe('tests http getVideoStatistic(id) request', () => {
    it('should have correct params', async () => {
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
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessable entity',
      });
      if (!actualError) {
        throw new Error('Error should be defined');
      }
      expect(actualError?.status).toBe(422);
      expect(actualError?.statusText).toBe('Unprocessable entity');
    });
  });

  describe('tests http getYoutubeApiItem(id)', () => {
    it('should have correct params getYoutubeApiItem(id).subscribe()', async () => {
      const id = 'ID_string';
      const requestVideoUrl =
        'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyB-sYrDcNSM42Dhm8HPyPt5qHpjmG9dkbM&id=ID_string';
      const videoResponse = [{ id: '1', videoName: 'foo' }];
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
        'Http url control'
      );
      req.flush('Server error', {
        status: 422,
        statusText: 'Unprocessable entity',
      });
      if (!actualError) {
        throw new Error('Error needs to be defined');
      }
      expect(actualError.status).toBe(422);
      expect(actualError.statusText).toBe('Unprocessable entity');
    });
  });
});
