import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [FormsModule, SortComponent, RouterModule],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss'
})
export class SortComponent {
  public dateColor?: string;
}
