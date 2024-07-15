import { Injectable } from '@angular/core';
import { IAuth } from '../../types/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  setObject(key: string, value: IAuth): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string): IAuth {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

}
