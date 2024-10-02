import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteComponent } from './favorite.component';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../redux/cards.reducer';
import { Router } from '@angular/router';

describe('Favorite Component', () => {
  let component: FavoriteComponent;
  let fixture: ComponentFixture<FavoriteComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FavoriteComponent],
      providers: [provideMockStore({ initialState })],
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
    jest.spyOn(router, 'navigateByUrl');
    component.navigateToRoute('1');
    expect(router.navigateByUrl).toHaveBeenCalledWith('layout/item/1');
  });
});
