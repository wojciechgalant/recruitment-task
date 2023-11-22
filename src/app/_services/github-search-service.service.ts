import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiGithubService } from './api-github.service';
import { IGithubUserResponse } from '../_types/github-user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubSearchService {
  private _cache: { [cacheKey: string]: IGithubUserResponse } = {};

  constructor(private apiGithubService: ApiGithubService) {}

  get cache() {
    return this._cache;
  }

  searchUsers(query: string, page: number = 1, perPage: number = 10): Observable<IGithubUserResponse | null> {
    const cacheKey = this.cacheKey(query, page, perPage);

    if (this._cache[cacheKey]) {
      return of(this._cache[cacheKey]);
    }

    return this.apiGithubService.getGithubUsersRequest(query, page, perPage).pipe(
      map((data) => {
        this._cache[cacheKey] = data;
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching GitHub users:', error);
        return of(null);
      })
    );
  }

  cacheKey(searchTerm: string, currentPage: number, itemsPerPage: number): string {
    return `${searchTerm}_${currentPage}_${itemsPerPage}`;
  }
}
