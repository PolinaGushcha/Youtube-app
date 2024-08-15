import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.scss',
})
export class CreateCardComponent {
  public router = inject(Router);

  public form = new FormGroup({
    title: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl<string | null>(null, Validators.maxLength(255)),
    imgLink: new FormControl<string | null>(null, [Validators.required, Validators.pattern('https?://.+')]),
    videoLink: new FormControl<string | null>(null, [Validators.required, Validators.pattern('https?://.+')]),
    creationDate: new FormControl<string | null>(null, [Validators.required, this.maxDateValidator(new Date())]),
  });

  maxDateValidator(maxDate: Date) {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      if (selectedDate > maxDate) {
        return { maxDateResult: 'The date is invalid' };
      }
      return null;
    };
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.router.navigate(['']);
    }
  }

  onReset() {
    this.form.reset();
  }
}
