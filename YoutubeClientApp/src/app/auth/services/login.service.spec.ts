import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login functions', () => {
    it('setObject', () => {
      const mockData = {
        password: '1234567UuUu!',
        username: 'polina123456@gmail.com',
      };
      service.setObject('auth', mockData);
      const storedValue = localStorage.getItem('auth');
      expect(storedValue).toBeTruthy();
      expect(JSON.parse(storedValue!)).toEqual(mockData);
    });

    it('getObject', () => {
      const mockData = {
        password: '1234567UuUu!',
        username: 'polina123456@gmail.com',
      };
      localStorage.setItem('auth', JSON.stringify(mockData));
      const result = service.getObject('auth');
      expect(result).toEqual(mockData);
    });

    it('removeObject', () => {
      const mockData = {
        password: '1234567UuUu!',
        username: 'polina123456@gmail.com',
      };
      localStorage.setItem('auth', JSON.stringify(mockData));
      service.removeObject('auth');
      const storedValue = localStorage.getItem('auth');
      expect(storedValue).toBeNull();
    });
  });
});
