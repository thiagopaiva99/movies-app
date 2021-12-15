import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  private category: string = 'most-popular';

  public categories: Map<string, Category> = new Map([
    ['most-popular', { apiValue: 'most_popular', text: 'Most Popular' }],
    ['now-playing', { apiValue: 'now_playing', text: 'Now Playing' }],
    ['top-rated', { apiValue: 'top_rated', text: 'Top Rated' }],
  ]);

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category'];
    console.log(this.category)
  }

}
