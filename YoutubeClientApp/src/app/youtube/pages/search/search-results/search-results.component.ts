import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ISortObj, Item } from '../../../../types/response';
import { GetBorderColorService } from '../../../../core/services/get-border-color.service';
import { SortByDatePipe } from "../../../../shared/pipes/sort-by-date.pipe";
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';
import { CountOfViewsPipe } from "../../../../shared/pipes/count-of-views.pipe";
import { ByWordOrSentancePipe } from "../../../../shared/pipes/by-word-or-sentance.pipe";

@Component({
    selector: 'app-search-results',
    standalone: true,
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss',
    imports: [FormsModule, CommonModule, SortByDatePipe, FilterPipe, CountOfViewsPipe, ByWordOrSentancePipe]
})
export class SearchResultsComponent implements OnInit {

  public showDiv = false;
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showDiv = this.router.url.includes('/results');
    });
  }

  @Input() inputVal = "";

  public data:Item[] = inject(GetBorderColorService).generalData;

  constructor(private router: Router) {}
  navigateToRoute(itemData: string) {
    this.router.navigate(['/search-item', itemData])
  }

  public borderService = inject(GetBorderColorService);
  public getColorClass (date: string | undefined): string {
    return this.borderService.getColorClass(date)
  }

  @Input() upAndDownArrow = false

  @Input() sortType: ISortObj = {
    sortByDate: false,
    dateUp: false,
    countOfViews: false,
    countOfViewsUp: false,
    byWordOrSentance: false,
    byWordOrSentanceText: '',
  }

}
