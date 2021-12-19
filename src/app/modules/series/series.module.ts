import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './containers/series-list/series-list.component';
import { ListItemModule } from 'src/app/shared/components/list-item/list-item.module';
import { InfiniteScrollModule } from 'src/app/shared/components/infinite-scroll/infinite-scroll.module';
import { SpinnerModule } from 'src/app/shared/components/spinner/spinner.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


@NgModule({
  declarations: [SeriesListComponent],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    ListItemModule,
    InfiniteScrollModule,
    SpinnerModule,
    LazyLoadImageModule
  ]
})
export class SeriesModule { }
