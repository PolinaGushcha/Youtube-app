import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { IAuth } from '../../types/auth';

describe('LoginService test', () => {
  const testValue: IAuth = { username: 'John', password: 'hash' };
  const testKey = 'authData';
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const localStorageRemoveItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide LocalStorage setObject() test', () => {
    service.setObject(testKey, testValue);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(testKey, JSON.stringify(testValue));
  });

  it('should provide localStorage getObject() test', () => {
    const result = service.getObject(testKey);
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(testKey);
    expect(result).toEqual(testValue);
  });

  it('should provide localStorage removeObject() test', () => {
    service.removeObject(testKey);
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith(testKey);
  });
});
