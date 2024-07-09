import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortComponent } from '../../sort/sort.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, SortComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  public displaySortCpmponent?: boolean;
  toggleSortComponent() {
    this.displaySortCpmponent = !this.displaySortCpmponent;
  }

  public searchingText?: string;

  public getSerchingText () {
    return ""
  }



  @Input() inputVal = "hello";
}
