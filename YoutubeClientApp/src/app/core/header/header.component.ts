import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  public displaySortCpmponent?: boolean;
  public toggleSortComponent () {
    this.displaySortCpmponent = !this.displaySortCpmponent;
  }

  public searchingText = "";
  @Output() shareSearchingText = new EventEmitter<string>()
  public getSearchingText (value: string) {
    this.shareSearchingText.emit(value)
  }


  
  
  public sortingText = "";
  // @Output() shareSortingText = new EventEmitter<string>()
  // public getSortingText () {
  //   // this.shareSortingText.emit(this.sortingText)
  //   console.log('dhdhd')
  // }




  public deleteSearchingText () {
    this.displaySortCpmponent = false;
    this.searchingText = ""
  }

  public upAndDownIsAvaliable = ''
  public upAndDown = false;
  @Output() shareUpAndDown = new EventEmitter<boolean>();
  public reverseArrow () {
    this.upAndDown = !this.upAndDown;
    this.shareUpAndDown.emit(this.upAndDown)
  }

  @Output() shareSortObj = new EventEmitter<string>()
  public handleSortObj (value: string) {
    this.upAndDown = false;
    this.upAndDownIsAvaliable = this.upAndDownIsAvaliable === value ? '' : value;
    this.shareSortObj.emit(value)
  }
}
