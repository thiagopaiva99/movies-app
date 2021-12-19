import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ListItemComponent } from './list-item.component';



@NgModule({
  declarations: [
    ListItemComponent
  ],
  exports: [ListItemComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule
  ]
})
export class ListItemModule { }
