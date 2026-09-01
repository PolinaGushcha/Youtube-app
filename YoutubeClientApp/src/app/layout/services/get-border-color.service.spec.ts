import { TestBed } from '@angular/core/testing';

import { GetBorderColorService } from './get-border-color.service';
import { addDays } from 'date-fns';

describe('GetBorderColorService', () => {
  let service: GetBorderColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBorderColorService],
    });
    service = TestBed.inject(GetBorderColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get style class', () => {
    it('should return a "color-blue"', () => {
      const recentDate = addDays(new Date(), -6).toISOString();
      expect(service.getColorClass(recentDate)).toBe('color-blue');
    });

    it('should return a "color-green', () => {
      const recentDate = addDays(new Date(), -29).toISOString();
      expect(service.getColorClass(recentDate)).toBe('color-green');
    });

    it('should return a "color-yellow', () => {
      const recentDate = addDays(new Date(), -179).toISOString();
      expect(service.getColorClass(recentDate)).toBe('color-yellow');
    });

    it('should return a "color-red', () => {
      const recentDate = addDays(new Date(), -180).toISOString();
      expect(service.getColorClass(recentDate)).toBe('color-red');
    });

    it('should return "color-blue" if date is undefined', () => {
      expect(service.getColorClass(undefined)).toBe('color-blue');
    });

    it('should return a "color-blue" if date is invalid', () => {
      expect(service.getColorClass('invalidDate')).toBe('color-blue');
    });
  });
});
