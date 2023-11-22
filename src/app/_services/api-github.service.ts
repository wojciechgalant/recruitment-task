import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGithubUserResponse } from '../_types/github-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiGithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private readonly http: HttpClient) { }

  getGithubUsersRequest(query: string, page: number, perPage: number): Observable<IGithubUserResponse> {
    const url = `${this.apiUrl}/search/users?q=${query}&page=${page}&per_page=${perPage}`;

    return this.http.get<IGithubUserResponse>(url);
  }
}
