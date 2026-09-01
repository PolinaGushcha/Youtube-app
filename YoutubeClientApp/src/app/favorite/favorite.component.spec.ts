import { FavoriteComponent } from './favorite.component';
import { initialState } from '../redux/cards.reducer';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('FavoriteComponent', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FavoriteComponent],
      providers: [provideMockStore({ initialState })], // configure a mock store for unit tests  with initial state. By default, initialState and selectors are not defined.
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('checks creating component', () => {
    expect(component).toBeTruthy();
  });

  it('check routing to layout/item/${id}', () => {
    jest.spyOn(router, 'navigateByUrl'); // jest.spyOn is used to create a spy on the router.navigateByUrl method, allowing the test to track whether this method is called and, if so, with which arguments.
    // Spying on navigateByUrl ensures that the actual router navigation is not triggered during testing, as the focus is on verifying the call and its parameters, not executing real navigation
    component.navigateToRoute('1');
    expect(router.navigateByUrl).toHaveBeenCalledWith('layout/item/1');
  });
});
