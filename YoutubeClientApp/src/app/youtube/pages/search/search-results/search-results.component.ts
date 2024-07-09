import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Item } from '../../../../types/response';
import { GetBorderColorService } from '../../../../shared/services/get-border-color.service';
import { SortByDatePipe } from "../../../../shared/pipes/sort-by-date.pipe";
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';

@Component({
    selector: 'app-search-results',
    standalone: true,
    templateUrl: './search-results.component.html',
    styleUrl: './search-results.component.scss',
    imports: [FormsModule, CommonModule, SortByDatePipe, FilterPipe]
})
export class SearchResultsComponent {

  public data:Item[] = inject(GetBorderColorService).generalData;

  constructor(private router: Router) {}
  navigateToRoute(itemData: string) {
    this.router.navigate(['/search-item', itemData])
  }

  public borderService = inject(GetBorderColorService);
  public getColorClass (date: string | undefined): string {
    return this.borderService.getColorClass(date)
  }

}
