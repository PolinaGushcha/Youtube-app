import { TestBed } from '@angular/core/testing';
import { FormStateService } from './create-card.service';

describe('Create-card test', () => {
  let service: FormStateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FormStateService],
    });
    service = TestBed.inject(FormStateService);
  });
  it('shuld be created', () => {
    expect(service).toBeTruthy();
  });

  it('shold test the setFormData and getFormData', () => {
    const initialFormData = { title: 'John', description: 'John description' };
    service.setFormData(initialFormData);
    expect(service.getFormData()).toEqual(initialFormData);
  });
});
