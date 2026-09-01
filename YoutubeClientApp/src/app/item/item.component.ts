import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBorderColorService } from '../layout/services/get-border-color.service';
import { ApiService } from '../api/api.service';
import { ICard, IData, IDetailsItem, IStatistic } from '../types/response';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {
  public activatedRouter: ActivatedRoute = inject(ActivatedRoute);
  public router: Router = inject(Router);
  public borderService = inject(GetBorderColorService);
  public apiService = inject(ApiService);

  public data = signal<IData | undefined>(undefined);
  public statistics = signal<IStatistic | undefined>(undefined);

  public isLoading = signal(false);
  public showComponent = signal(true);

  constructor(private _location: Location) {}

  getColorClass(date: string | undefined): string {
    return this.borderService.getColorClass(date);
  }

  goBack() {
    this._location.back();
  }

  getData() {
    this.isLoading.set(true);
    this.apiService.getYoutubeApiItem(this.activatedRouter.snapshot.params['id']).subscribe(buffer => {
      const responseBuffer = buffer as IDetailsItem;
      const responseItems = responseBuffer.items as IData[];
      this.data.set(responseItems[0]);
      this.isLoading.set(false);
    });
    this.apiService.getVideoStatistic(this.activatedRouter.snapshot.params['id']).subscribe(buffer => {
      const responseBuffer = buffer as IDetailsItem;
      const responseItems = responseBuffer.items as ICard[];
      this.statistics.set(responseItems[0].statistics);
      this.isLoading.set(false);
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
