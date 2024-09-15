import { TestBed } from '@angular/core/testing';
import { FormStateService } from './create-card.service';
import { IForm } from '../types/form';

describe('CreateCardService', () => {
  let service: FormStateService;
  const data: Partial<IForm> = { title: 'Title' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormStateService],
    });

    service = TestBed.inject(FormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shold set form data', () => {
    service.setFormData(data);
    expect(service.formDataSubject.getValue()).toEqual({ title: 'Title' });
  });

  it('should get form data', () => {
    service.formDataSubject.next({ title: 'Title' });
    const result = service.getFormData();
    expect(result).toEqual({ title: 'Title' });
  });
});
