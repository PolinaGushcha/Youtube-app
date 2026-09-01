// https://www.notion.so/Transcription-16-Testing-inputs-and-outputs-in-Angular-components-1036bddbc491808b8ab1c4506f69ff0e

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { UtilsService } from './utils.service';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('PaginationComponent test', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const mockUtilityService = [1, 2, 3, 4, 5];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      // providers: [UtilsService],
      providers: [{ provide: UtilsService, useValue: mockUtilityService }],
    }).compileComponents();

    // const utilsService = Inject(UtilsService);
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.totalItems = 50;
    component.itemsPerPage = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render pagination list', () => {
    const container = fixture.debugElement.queryAll(By.css('[data-testid="page-container"]'));

    expect(container.length).toBe(5);
    expect(container[0].nativeElement.textContent).toContain('1');
  });

  it('should emit number page', () => {
    const container = fixture.debugElement.queryAll(By.css('[data-testid="page-container"]'));
    let currentPage: number | undefined;

    component.currentPageChangeEvent.pipe(first()).subscribe(page => {
      currentPage = page;
    });

    container[0].triggerEventHandler('click');

    expect(currentPage).toBe(1);
  });
});
