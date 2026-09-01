import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeartComponent } from './heart.component';
import { By } from '@angular/platform-browser';

describe('HeartComponent test', () => {
  let component: HeartComponent;
  let fixture: ComponentFixture<HeartComponent>; // Fixture for debugging and testing a component

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeartComponent],
    }).compileComponents(); // This function compiles the component's HTML and CSS templates. It is typically asynchronous, ensuring that the component is fully compiled before further actions are taken

    fixture = TestBed.createComponent(HeartComponent); // creates an instance of HeartComponent within a ComponentFixture
    component = fixture.componentInstance; // The fixture provides access to the component instance and its template. It also allows for control over change detection, rendering, and querying the component's DOM
    fixture.detectChanges(); // This triggers Angular’s change detection cycle, ensuring that the component’s bindings and data are fully updated in the DOM.
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('renders default @Input value', () => {
    const testedPic = fixture.debugElement.query(By.css('[data-testid="picture-container"]')); // fixture.debugElement accesses the component's DOM in the test environment. .query(By.css('[data-testid="picture-container"]')) searches for an element within the component template that has a data-testid="picture-container" attribute, making it easy to target a specific part of the DOM.
    expect(testedPic.nativeElement.textContent).toContain('false');
  });

  it('render custom render value', () => {
    component.isLiked = true;
    fixture.detectChanges();
    const testPic = fixture.debugElement.query(By.css('[data-testid="picture-container"]'));
    expect(testPic.nativeElement.textContent).toContain('true');
  });
});
