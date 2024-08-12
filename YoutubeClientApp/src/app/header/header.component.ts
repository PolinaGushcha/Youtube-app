import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IData } from '../types/response';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public apiService = inject(ApiService);
  public router = inject(Router);
  public loginService = inject(LoginService);

  public data = signal<IData[]>([]);
  public isLoading = signal<boolean>(false);
  public loginData = signal(this.loginService.getObject('authData')?.username || 'Your name');
  public displaySortCpmponent = signal<boolean>(false);
  public upAndDownIsAvaliable = signal<boolean>(false);
  public upAndDownType = signal<string>('');

  //делимся полученными данными и загрузкой
  @Output() shareData = new EventEmitter<IData[]>();
  @Output() shareIsLoading = new EventEmitter<boolean>();

  @Output() shareSortType = new EventEmitter<string>();
  handleSortType(value: string) {
    this.upAndDownIsAvaliable.set(false);
    this.upAndDownType.update(val => (val === value ? '' : value));
    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable());
    this.shareSortType.emit(value);
  }
  @Output() shareUpAndDownArrow = new EventEmitter<boolean>();
  reverseArrow() {
    this.upAndDownIsAvaliable.update(val => !val);
    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable());
  }

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(value?: string) {
    this.isLoading.set(true);
    this.shareIsLoading.emit(this.isLoading());
    return this.apiService.getYoutubeApiVideos(value);
    // .pipe(
    //   mergeMap((firstObject: any) => {
    //     const itemDetailsObservables = firstObject.items.map((item: any) => {
    //       return this.apiService.getVideoStatistic(item.id.videoId).pipe(map((el: any) => ({ ...item, ...el })));
    //     });
    //     return forkJoin(itemDetailsObservables);
    //   })
    // )
    // .subscribe(response => {
    //   console.log(response);
    //   this.data.set(response as IData[]);
    //   this.shareData.emit(this.data());
    //   this.isLoading.set(false);
    //   this.shareIsLoading.emit(this.isLoading());
    // });
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
    this.displaySortCpmponent.update(val => !val);
  }

  navigateToRoute(name?: string) {
    this.router.navigateByUrl(name ? `layout/${name}` : `layout`);
  }
}
