import { TestBed } from '@angular/core/testing';
import { IAuth } from '../../types/auth';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  const testKey = 'authKey';
  const testValue: IAuth = { username: 'test', password: '12345' };

  // Mock localStorage.setItem - another variant
  //   jest.spyOn(localStorage, 'setItem');
  //   localStorage.setItem = jest.fn();
  //   // Mock localStorage.getItem
  //   jest.spyOn(localStorage, 'getItem');
  //   localStorage.getItem = jest.fn(() => JSON.stringify(testValue));
  //   // Mock localStorage.removeItem
  //   jest.spyOn(localStorage, 'removeItem');
  //   localStorage.removeItem = jest.fn();
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const localStorageRemoveItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  // beforeEach(() => {
  //   service = new LoginService();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);

    // const localStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');
  });

  it('should be created', () => {
    expect(LoginService).toBeTruthy();
  });

  it('should call localStorage.setItem with correct arguments', () => {
    // Use spyOn to mock localStorage.setItem
    // const localStorageSetItem = jest.spyOn(Storage.prototype, 'setItem');

    service.setObject(testKey, testValue);

    // Check if localStorage.setItem was called with the correct arguments
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(testKey, JSON.stringify(testValue));
    // expect(localStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testValue));
  });

  it('should read an object from localStorage', () => {
    // const localStorageGetItem = jest.spyOn(Storage.prototype, 'getItem');
    const result = service.getObject(testKey);
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(testKey);
    // expect(localStorage.getItem).toHaveBeenCalledWith(testKey);
    expect(result).toEqual({ username: 'test', password: '12345' });
  });

  it('should be removed from localStorage', () => {
    // const localStorageRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
    service.removeObject(testKey);
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith(testKey);
    // expect(localStorage.removeItem).toHaveBeenCalledWith(testKey);
  });
});
