import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<void>();
  @Output() termChanges = new EventEmitter<string>();

  searchTerm = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((term) => !!term && this.searchTerm.valid),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((term: string | null) => {
        this.termChanges.emit(term as string);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch() {
    this.search.emit();
  }
}
