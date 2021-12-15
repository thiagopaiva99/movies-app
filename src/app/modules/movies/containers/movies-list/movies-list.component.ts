import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from 'src/app/core/services/movies.service';
import { Category } from '../../movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  private category: string = 'most-popular';

  public categories: Map<string, Category> = new Map([
    ['most-popular', { apiValue: 'popular', text: 'Most Popular' }],
    ['now-playing', { apiValue: 'now_playing', text: 'Now Playing' }],
    ['top-rated', { apiValue: 'top_rated', text: 'Top Rated' }],
  ]);

  public movies$!: Observable<Movie[]>;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category'];

    const category = this.categories.has(this.category)
      ? this.categories.get(this.category)?.apiValue
      : this.categories.entries().next().value[1].apiValue;

    this.movies$ = this.moviesService.getMoviesByCategory(category);
  }

}
