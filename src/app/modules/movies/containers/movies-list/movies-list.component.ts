import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  private category: string = 'most-popular';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category'];
    console.log(this.category)
  }

}
