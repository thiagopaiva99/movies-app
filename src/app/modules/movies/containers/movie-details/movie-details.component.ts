import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Character, Movie } from 'src/app/core/models';
import { MoviesService } from '../../../../core/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private router: Router) { }

  public movie!: Movie;
  public cast$!: Observable<Character[]>;
  public recommendations$!: Observable<Movie[]>;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.moviesService.getById(+id).subscribe(movie => {
        this.movie = movie
      }, (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.router.navigate(['page-not-found'])
        }
      })

      this.cast$ = this.moviesService.getCredits(+id)
      this.recommendations$ = this.moviesService.getRecommendations(+id)
    })
  }

  onRecommendationClick(movie: Movie) {
    this.router.navigate(['/movie', movie.id, 'details'], { skipLocationChange: true });
  }

  /* istanbul ignore next */
  slidePrevious(element: HTMLElement) {
    const elementWidth = element.offsetWidth;
    element.scroll({ left: element.scrollLeft - elementWidth, behavior: 'smooth' });
  }

  /* istanbul ignore next */
  slideNext(element: HTMLElement) {
    const elementWidth = element.offsetWidth;
    element.scroll({ left: element.scrollLeft + elementWidth, behavior: 'smooth' });
  }
}
