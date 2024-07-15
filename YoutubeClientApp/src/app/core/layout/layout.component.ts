import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { SearchResultsComponent } from '../../youtube/search/search-results/search-results.component';
import { SearchItemComponent } from '../../youtube/search/search-item/search-item.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../../auth/login/login.component';
import { RegistrationComponent } from '../../auth/registration/registration.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, LoginComponent, RegistrationComponent, SearchResultsComponent, SearchItemComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  public filterDataByText = "filterDataByText"

  public sortType = '';

  public upAndDownIsAvaliable = false;


  
  getFilterDataByText (text: string) {
    this.filterDataByText = text;
  }

  getSortType (text: string) {
    this.sortType = text;
  }
  
  getUpAndDownArrow (value: boolean) {
      this.upAndDownIsAvaliable = value
  }

}
