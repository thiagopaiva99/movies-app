import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from './movie-item.component';



@NgModule({
  declarations: [
    MovieItemComponent
  ],
  exports: [MovieItemComponent],
  imports: [
    CommonModule
  ]
})
export class MovieItemModule { }
