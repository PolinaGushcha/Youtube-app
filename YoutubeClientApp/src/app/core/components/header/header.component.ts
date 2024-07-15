import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public displaySortCpmponent?: boolean;

  public filterDataByText = "";

  public sortByWordOrSentanceText = "";

  public upAndDownIsAvaliable?: boolean;

  public upAndDownType = "";

  public router = inject(Router)



  // deleteSearchAndSort () {
  //   this.displaySortCpmponent = false;
  //   this.filterDataByText = "";
  // }

  toggleSortComponent () {
    this.displaySortCpmponent = !this.displaySortCpmponent;
  }

  @Output() shareFilterDataByText = new EventEmitter<string>()
  handleFilterDataByText (value: string) {
    this.shareFilterDataByText.emit(value);
    this.router.navigate(['results']); 
  }

  @Output() shareSortType = new EventEmitter<string>()
  handleSortType (value: string) {
    this.upAndDownIsAvaliable = false;
    this.upAndDownType = this.upAndDownType === value ? '' : value;

    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable);
    this.shareSortType.emit(value);
  }

  @Output() shareUpAndDownArrow = new EventEmitter<boolean>();
  reverseArrow () {
    this.upAndDownIsAvaliable = !this.upAndDownIsAvaliable;
    this.shareUpAndDownArrow.emit(this.upAndDownIsAvaliable);
  }
}
