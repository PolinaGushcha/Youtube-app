import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UtilsService } from './utils.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  providers: [UtilsService],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() totalItems = 40;
  @Input() itemsPerPage = 20;
  @Input() currentPage = 1;
  pagesCount = 1;
  pages: number[] = [];

  @Output() currentPageChange = new EventEmitter<number>();
  utilsService = inject(UtilsService);

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = this.pagesCount > 0 ? this.utilsService.range(1, this.pagesCount + 1) : [];
  }

  selectPage(page = 1): void {
    this.currentPageChange.emit(page);
  }
  /*
   ******************************
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.currentPageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  previousPage() {
    this.changePage(this.currentPage - 1);
  }
}
