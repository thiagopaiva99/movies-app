import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie, MovieApiResponse, Pagination } from '../models';
import { map, Observable } from 'rxjs';
import { ApiUtilsService } from './api-utils.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient, private apiUtilsService: ApiUtilsService, private imageService: ImageService) { }

  getMoviesByCategory(category: string): Observable<Movie[]> {
    return this.httpClient.get<Pagination<MovieApiResponse>>(`https://api.themoviedb.org/3/movie/${category}`)
      .pipe(
        map((value: Pagination<MovieApiResponse>) => value.results),
      map((movies: MovieApiResponse[]) => movies.map(movie => ({ ...this.apiUtilsService.rewriteProperties<Movie>(movie), imageUrl: this.imageService.getUrl(movie.poster_path as string)})))
      );
  }

}
