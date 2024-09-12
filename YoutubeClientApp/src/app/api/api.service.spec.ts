import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('creates a service', () => {
    expect(service).toBeTruthy();
  });
});
