import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart.component.html',
  styleUrl: './heart.component.scss',
})
export class HeartComponent {
  @Input() isLiked?: boolean = false;
}
