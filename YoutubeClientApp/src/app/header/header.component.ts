import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IData, IResponseVideos } from '../types/response';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';
// import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  //получение данных карточек
  public apiService = inject(ApiService);
  public data = signal<IData[]>([]);
  public isLoading = signal<boolean>(false);

  //полученме данных юзера
  public loginService = inject(LoginService);
  public router = inject(Router);
  public loginData = this.loginService.getObject('authData')?.username || 'Your name';

  //сортировка
  public displaySortCpmponent?: boolean;
  public upAndDownIsAvaliable?: boolean;
  public upAndDownType = '';

  //делимся полученными данными и загрузкой
  @Output() shareData = new EventEmitter<IData[]>();
  @Output() shareIsLoading = new EventEmitter<boolean>();

  @Output() shareSortType = new EventEmitter<string>();
  handleSortType(value: string) {
    this.upAndDownIsAvaliable = false;
    this.upAndDownType = this.upAndDownType === value ? '' : value;
    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable);
    this.shareSortType.emit(value);
  }
  @Output() shareUpAndDownArrow = new EventEmitter<boolean>();
  reverseArrow() {
    this.upAndDownIsAvaliable = !this.upAndDownIsAvaliable;
    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable);
  }

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(value?: string) {
    this.isLoading.set(true);
    this.shareIsLoading.emit(this.isLoading());
    return this.apiService
      .getYoutubeApiVideos(value)
      .pipe(
        mergeMap(firstObject => {
          const responseData = firstObject as IResponseVideos;
          const itemDetailsObservables = responseData.items.map(item => {
            return this.apiService.getVideoStatistic(item.id.videoId).pipe(map(el => ({ ...item, ...el })));
          });
          return forkJoin(itemDetailsObservables);
        })
      )
      .subscribe(response => {
        // this.data = response as IData[];
        this.data.set(response as IData[]);
        this.shareData.emit(this.data());
        this.isLoading.set(false);
        this.shareIsLoading.emit(this.isLoading());
      });
  }

  logout() {
    this.loginService.removeObject('authData');
    this.router.navigateByUrl('login');
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (value.length % 3 === 0) {
      this.searchVideos(value);
    }
  }

  toggleSortComponent() {
    this.displaySortCpmponent = !this.displaySortCpmponent;
  }

  navigateToRoute(name?: string) {
    this.router.navigateByUrl(name ? `layout/${name}` : `layout`);
  }
}
