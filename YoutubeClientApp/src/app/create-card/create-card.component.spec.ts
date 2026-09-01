import { TestBed } from '@angular/core/testing';
import { FormStateService } from './create-card.service';

describe('CreateCardComponent', () => {
  let service: FormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FormStateService],
    });
    service = TestBed.inject(FormStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test the setFormData and getFormData', () => {
    const initialFormData = { title: 'John', description: 'John description' }; // почему тут только так мало данных
    service.setFormData(initialFormData);
    expect(service.getFormData()).toEqual(initialFormData);
  });
});
