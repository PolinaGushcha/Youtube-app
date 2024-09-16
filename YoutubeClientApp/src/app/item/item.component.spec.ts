import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ItemComponent } from './item.component';
import { ActivatedRoute } from '@angular/router';
import { IData } from '../types/response';
import { GetBorderColorService } from '../layout/services/get-border-color.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  const mockBorderColorService = new GetBorderColorService() as GetBorderColorService;
  const mockData = {
    etag: 'etag',
    id: {
      kind: 'kind',
      videoId: 'videoId',
    },
    items: [],
    kind: 'kind',
    pageInfo: {
      resultsPerPage: 1,
      totalResults: 1,
    },
    snippet: {
      publishAt: new Date().toISOString(),
      publishTime: 'publishTime',
      channelId: 'channelId',
      title: 'title',
      description: 'description',
      liveBroadcastContent: 'liveBroadcastContent',
      channelTitle: 'channelTitle',
      thumbnails: {
        high: {
          url: 'test-url',
          width: 2,
          height: 2,
        },
        default: {
          url: 'test-url',
          width: 2,
          height: 2,
        },
        medium: {
          url: 'test-url',
          width: 2,
          height: 2,
        },
      },
    },
    isLiked: false,
  } as IData;

  beforeEach(async () => {
    const params = { id: 'j6bfqIBv5jc' }; // Mock params object

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params } },
        },
        { provide: GetBorderColorService, useValue: mockBorderColorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit is working', () => {
    jest.spyOn(component, 'getData');
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
  });

  it('should show loading when isLoading is true', () => {
    component.isLoading.set(true);
    const loadingElement = fixture.nativeElement.querySelector('h3');
    expect(loadingElement).toBeTruthy();
  });

  it('should hide details container when isLoading is true', () => {
    component.isLoading.set(true);
    const detailsContainer = fixture.nativeElement.querySelector('.details-container');
    expect(detailsContainer).toBeFalsy();
  });

  it('should call goBack method when goBack button is clicked', () => {
    component.isLoading.set(false);
    component.showComponent.set(true);
    fixture.detectChanges();
    jest.spyOn(component, 'goBack');
    const backButton = fixture.nativeElement.querySelector('.goBack-button');
    expect(backButton).toBeTruthy();
    backButton.click();
    expect(component.goBack).toHaveBeenCalled();
  });

  it('should display data when isLoading is false', () => {
    component.isLoading.set(false);
    component.showComponent.set(true);
    component.data.set(mockData);
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector('.info-h2');
    expect(titleElement.textContent).toContain('title');

    const descriptionElement = fixture.nativeElement.querySelector('.description-text');
    expect(descriptionElement.textContent).toContain('description');
  });

  it('should get correct color class from getColorClass method', () => {
    const colorClass = component.getColorClass('2024-09-15T12:00:00Z');
    expect(colorClass).toBe('color-blue');
  });
});
