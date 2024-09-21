import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeartComponent } from './heart.component';

describe('HeartComponent test', () => {
  let component: HeartComponent;
  let fixture: ComponentFixture<HeartComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
