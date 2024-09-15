import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCardComponent } from './create-card.component'; // Adjust the path accordingly
import { FormStateService } from './create-card.service';
import { ICardObj } from '../redux/state.models';
import { appRoutes } from '../app.routes';
import { provideRouter } from '@angular/router';

describe('CreateCardComponent', () => {
  let component: CreateCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CommonModule, CreateCardComponent],
      providers: [
        FormStateService,
        provideRouter([...appRoutes]),
        provideMockStore({ initialState: { cardState: [] as ICardObj[] } }), // Provide a mock store with initial state
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Add additional tests as needed
});
