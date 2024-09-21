import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeartComponent } from './heart.component';
import { By } from '@angular/platform-browser';

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

  it('renders default @Input value', () => {
    const testedPic = fixture.debugElement.query(By.css('[data-testid="picture-container"]'));
    expect(testedPic.nativeElement.textContent).toContain('false');
  });

  it('render custon render value', () => {
    component.isLiked = true;
    fixture.detectChanges();
    const testPic = fixture.debugElement.query(By.css('[data-testid="picture-container"]'));
    expect(testPic.nativeElement.textContent).toContain('true');
  });
});
