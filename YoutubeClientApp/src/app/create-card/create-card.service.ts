import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IForm } from '../types/form';

@Injectable({
  providedIn: 'root',
})
export class FormStateService {
  private formDataSubject = new BehaviorSubject({});
  formData$ = this.formDataSubject.asObservable();

  setFormData(data: Partial<IForm>) {
    this.formDataSubject.next(data);
  }

  getFormData() {
    return this.formDataSubject.getValue();
  }
}
