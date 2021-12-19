import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnInit {

  public search!: string;
  public movies: Movie[] = [];
  public isLoading = true;
  private currentPage = 1;

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.search = this.activatedRoute.snapshot.queryParams['query'];
    this.loadMovies(this.currentPage);
  }

  onMovieClick(movie: Movie) {
    this.router.navigate(['movie', movie.id, 'details'])
  }

  onScroll() {
    if (this.isLoading) {
      return;
    }

    this.currentPage++;
    this.loadMovies(this.currentPage);
  }

  onSearch(query: string) {
    this.search = query;
    this.router.navigate([], { queryParams: { query } })
    this.currentPage = 1;
    this.movies = [];
    this.loadMovies(this.currentPage);
  }

  private loadMovies(page: number) {
    this.isLoading = true;
    this.moviesService.search(this.search, page)
      .pipe(tap(() => this.isLoading = false), first())
      .subscribe((movies: Movie[]) => this.movies.push(...movies));
  }
}
