import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './containers/movies-list/movies-list.component';
import { MovieDetailsComponent } from './containers/movie-details/movie-details.component';
import { TabPillsComponent } from './components/tab-pills/tab-pills.component';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent,
    TabPillsComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
