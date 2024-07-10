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
  public getSerchingText (value: string) {
    this.shareSearchingText.emit(value)
  }

  public deleteSearchingText () {
    this.displaySortCpmponent = false;
    this.searchingText = ""
  }

  @Output() shareSortObj = new EventEmitter<string>()
  public handleSortObj (value: string) {
    console.log(value)
    this.shareSortObj.emit(value)
  }
}
