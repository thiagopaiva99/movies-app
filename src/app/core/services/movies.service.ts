import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie, MovieApiResponse, Pagination } from '../models';
import { map, Observable } from 'rxjs';
import { ApiUtilsService } from './api-utils.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient, private apiUtilsService: ApiUtilsService) { }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.httpClient.get<Pagination<MovieApiResponse>>(`https://api.themoviedb.org/3/movie/${category}`)
      .pipe(
        map((value: Pagination<MovieApiResponse>) => value.results),
      map((response: MovieApiResponse[]) => response.map(value => this.apiUtilsService.rewriteProperties<Movie>(value)))
      );
  }

}
