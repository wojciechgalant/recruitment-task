import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component';
import { ResultsComponent } from '../results/results.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchComponent,
    ResultsComponent,
    EmptyStateComponent,
  ],
})
export class HomeModule {}
