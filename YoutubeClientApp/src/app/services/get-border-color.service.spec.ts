import { TestBed } from '@angular/core/testing';

import { GetBorderColorService } from './get-border-color.service';

describe('GetBorderColorService', () => {
  let service: GetBorderColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBorderColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
