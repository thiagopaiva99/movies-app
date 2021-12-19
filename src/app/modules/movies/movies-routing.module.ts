import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './containers/movie-details/movie-details.component';
import { MoviesListComponent } from './containers/movies-list/movies-list.component';
import { MoviesSearchComponent } from './containers/movies-search/movies-search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'most-popular'
  },
  {
    path: 'search',
    component: MoviesSearchComponent
  },
  {
    path: ':id/details',
    component: MovieDetailsComponent
  },
  {
    path: ':category',
    component: MoviesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
