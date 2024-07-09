import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as cardsData from "../../../../assets/response.json"
import { CommonModule, DatePipe } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetBorderColorService } from '../../../../core/services/get-border-color.service';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss'
})
export class SearchItemComponent {
  public activatedRouter: ActivatedRoute = inject(ActivatedRoute)
  public router: Router = inject(Router);

  public data = cardsData.items.find(el => el.id == this.activatedRouter.snapshot.params['id'])

  constructor(private _location: Location) {}

  pipe = new DatePipe('en-US');
  myFormattedDate = this.pipe.transform(this.data?.snippet.publishedAt, 'short');

  goBack() {
    this._location.back();
  }

  public borderService = inject(GetBorderColorService);
  public getColorClass (date: string | undefined): string {
    return this.borderService.getColorClass(date)
  }

  // public getColorClass(date: string | undefined): string {
  //   const instanceOfObj = new SearchResultsComponent(this.router);
  //   const instanceFunc = instanceOfObj.getColorClass(date)
  //   return instanceFunc
  // }
}
