import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../core/components/header/header.component';
import { SearchResultsComponent } from '../youtube/search/search-results/search-results.component';
import { SearchItemComponent } from '../youtube/search/search-item/search-item.component';
import { FooterComponent } from '../core/components/footer/footer.component';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    SearchResultsComponent,
    SearchItemComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public filterDataByText = 'filterDataByText';

  public sortType = '';

  public upAndDownIsAvaliable = false;

  public showItemComponent = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showItemComponent = !this.router.url.includes('search-item');
      }
    });
  }

  getFilterDataByText(text: string) {
    this.filterDataByText = text;
  }

  getSortType(text: string) {
    this.sortType = text;
  }

  getUpAndDownArrow(value: boolean) {
    this.upAndDownIsAvaliable = value;
  }
}
