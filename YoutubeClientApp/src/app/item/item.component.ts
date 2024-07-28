import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBorderColorService } from '../layout/services/get-border-color.service';
import { ApiService } from '../api/api.service';
import { IData, IStatistic } from '../types/response';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mergeMap, of } from 'rxjs';

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

  public data?: IData;
  public statistics?: IStatistic;

  public isLoading = false;
  public showComponent = true;

  constructor(private _location: Location) {}

  getColorClass(date: string | undefined): string {
    return this.borderService.getColorClass(date);
  }

  goBack() {
    this._location.back();
  }

  getData() {
    this.isLoading = true;
    this.apiService.getYoutubeApiItem(this.activatedRouter.snapshot.params['id']).subscribe((buffer: any) => {
      this.data = buffer.items[0] as IData;
      this.isLoading = false;
    });
    this.apiService.getVideoStatistic(this.activatedRouter.snapshot.params['id']).subscribe((buffer: any) => {
      this.statistics = buffer.items[0].statistics as IStatistic;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.getData();
  }
}
