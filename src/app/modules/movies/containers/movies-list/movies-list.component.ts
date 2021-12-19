import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';
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

  public movies: Movie[] = [];

  public isLoadingMoreMovies = true;

  private currentPage = 1;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category'];

    if (!this.categories.has(this.category)) {
      this.router.navigate(['page-not-found']);
    }

    this.loadMovies(this.getCurrentCategory(), this.currentPage)
  }

  private getCurrentCategory() {
    const category = this.categories.has(this.category)
      ? this.categories.get(this.category)!.apiValue
      : this.categories.entries().next().value[1].apiValue;

    return category;
  }

  onTabChange(tab: string) {
    const category = this.categories.get(tab);
    this.currentPage = 1
    this.router.navigate(['movie', tab])
    this.movies = []
    this.loadMovies(category!.apiValue, this.currentPage)
  }

  onScroll() {
    if (this.isLoadingMoreMovies) {
      return
    }

    this.currentPage++
    this.loadMovies(this.getCurrentCategory(), this.currentPage);
  }

  onMovieClick(movie: Movie) {
    this.router.navigate(['movie', movie.id, 'details'])
  }

  onSearch(search: string) {
    this.router.navigate(['movie', 'search'], { queryParams: { query: search } })
  }

  private loadMovies(category: string, page: number) {
    this.isLoadingMoreMovies = true;
    this.moviesService.getMoviesByCategory(category, page)
      .pipe( tap(() => this.isLoadingMoreMovies = false), first())
      .subscribe(movies => this.movies.push(...movies));
  }

}
