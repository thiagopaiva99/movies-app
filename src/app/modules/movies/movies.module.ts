import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './containers/movies-list/movies-list.component';
import { MovieDetailsComponent } from './containers/movie-details/movie-details.component';
import { TabPillsComponent } from './components/tab-pills/tab-pills.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesSearchComponent } from './containers/movies-search/movies-search.component';
import { InfiniteScrollModule } from 'src/app/shared/components/infinite-scroll/infinite-scroll.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ListItemModule } from 'src/app/shared/components/list-item/list-item.module';


@NgModule({
  declarations: [
    MoviesListComponent,
    MovieDetailsComponent,
    TabPillsComponent,
    SearchInputComponent,
    MoviesSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviesRoutingModule,
    ListItemModule,
    InfiniteScrollModule,
    SpinnerModule,
    LazyLoadImageModule
  ]
})
export class MoviesModule { }
