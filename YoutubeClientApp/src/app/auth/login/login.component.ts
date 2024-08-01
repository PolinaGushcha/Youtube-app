import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IAuth } from '../../types/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public router = inject(Router);

  public loginService = inject(LoginService);

  public form = new FormGroup({
    username: new FormControl<string | null>(null, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
      this.passwordValidatorUpperLowerCases,
      this.passwordValidatorLettersNumbers,
      this.passwordValidatorSpecialCharacter,
    ]),
  });

  passwordValidatorUpperLowerCases(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    if (!hasUpperCase || !hasLowerCase) {
      return {
        passwordUpperLowerCases:
          "Your password isn't strong enough: use a mixture of both uppercase and lowercase letters",
      };
    }
    return null;
  }

  passwordValidatorLettersNumbers(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLetter || !hasNumber) {
      return {
        passwordLettersNumbers: "Your password isn't strong enough: use a mixture of letters and numbers",
      };
    }
    return null;
  }

  passwordValidatorSpecialCharacter(control: AbstractControl): ValidationErrors | null {
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharacters.test(control.value)) {
      return null;
    } else {
      return {
        passwordSpecialCharacter:
          "Your password isn't strong enough: use at least one special character, e.g., ! @ # ? ]",
      };
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const authData = this.form.value as IAuth;
    if (this.form.valid) {
      this.loginService.setObject('authData', authData);
      this.router.navigate(['']);
    }
  }
}
