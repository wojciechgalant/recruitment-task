import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input()
  searchResults: any;

  @Input()
  currentPage: number | null = 1;

  @Output()
  loadNextPage = new EventEmitter<void>();

  @Output()
  loadPrevPage = new EventEmitter<void>();
}
