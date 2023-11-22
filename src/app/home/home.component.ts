import { Component, OnDestroy, OnInit } from '@angular/core';

import { BehaviorSubject, Subject, combineLatest, of } from 'rxjs';
import { filter, shareReplay, switchMap, takeUntil } from 'rxjs/operators';

import { GithubSearchService } from '../_services/github-search-service.service';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  searchTerm$ = new BehaviorSubject<string>('');
  currentPage$ = new BehaviorSubject<number>(1);
  itemsPerPage = 10;

  searchResults$ = combineLatest([this.searchTerm$, this.currentPage$]).pipe(
    filter(([searchTerm]) => searchTerm.length > 2),
    switchMap(([searchTerm, page]) =>
      this.githubSearchService.searchUsers(searchTerm, page, this.itemsPerPage)
    ),
    shareReplay()
  );

  private readonly destroy$ = new Subject<void>();

  constructor(private githubSearchService: GithubSearchService) {}

  ngOnInit(): void {
    this.searchResults$.pipe(takeUntil(this.destroy$), filter((data) => !!data)).subscribe((data) => {
      const cacheKey = this.githubSearchService.cacheKey(
        this.searchTerm$.getValue(),
        this.currentPage$.getValue(),
        this.itemsPerPage
      );

      if (!data) {
        return;
      }

      this.githubSearchService.cache[cacheKey] = data;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(): void {
    this.currentPage$.next(1);
  }

  onSearchTermChanges(event: string): void {
    this.searchTerm$.next(event);
  }

  onLoadNextPage(): void {
    const nextPage = this.currentPage$.value + 1;
    this.currentPage$.next(nextPage);
  }

  onLoadPrevPage(): void {
    if (this.currentPage$.value > 1) {
      const previousPage = this.currentPage$.value - 1;
      this.currentPage$.next(previousPage);
    }
  }
}
