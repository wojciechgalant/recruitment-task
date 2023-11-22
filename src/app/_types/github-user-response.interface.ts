import { GithubUser } from './github-user.type';

export interface IGithubUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}
