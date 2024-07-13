import { Injectable } from '@angular/core';
import { IAuth } from '../../types/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  onSubmit(formValues: IAuth) {
    console.dir(formValues)
  }

}
