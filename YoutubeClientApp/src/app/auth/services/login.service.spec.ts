import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { IAuth } from '../../types/auth';

describe('LoginService test', () => {
  const testValue: IAuth = { username: 'John', password: 'hash' };
  const testKey = 'authData';
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem'); // Tracks calls to localStorage.setItem, allowing the test to check whether setItem was called and with what arguments. This is useful for verifying that the service saves data correctly
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem'); // Tracks calls to localStorage.getItem, allowing the test to verify that getItem is used to retrieve data correctly and with the right key.
  const localStorageRemoveItemSpy = jest.spyOn(Storage.prototype, 'removeItem'); // Tracks calls to localStorage.removeItem, enabling the test to confirm that removeItem is called when clearing authentication data.

  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // resets the state of all mock functions created by jest.spyOn() or jest.fn(). This ensures that each test starts with a fresh mock state, preventing interference between tests and making results reliable and isolated
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide LocalStorage setObject() test', () => {
    service.setObject(testKey, testValue);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(testKey, JSON.stringify(testValue)); // toHaveBeenCalledWith() - Ensure that a mock function is called with specific arguments.
  });

  it('should provide localStorage getObject() test', () => {
    const result = service.getObject(testKey);
    expect(localStorageGetItemSpy).toHaveBeenCalledWith(testKey);
    expect(result).toEqual(testValue);
  });

  it('should provide localStorage removeObject() test', () => {
    service.removeObject(testKey);
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith(testKey); // toHaveBeenCalledWith(testKey) asserts that localStorage.removeItem was indeed called with testKey as its argument.
    // localStorageRemoveItemSpy is a spy on localStorage.removeItem, set up previously to observe and track calls to this method.
  });
});
