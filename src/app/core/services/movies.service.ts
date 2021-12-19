import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Character, CharacterApiResponse, Movie, MovieApiResponse, Pagination } from '../models';
import { map, Observable } from 'rxjs';
import { ApiUtilsService } from './api-utils.service';
import { ImageService } from './image.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient, private apiUtilsService: ApiUtilsService, private imageService: ImageService) { }

  getMoviesByCategory(category: string, page = 1): Observable<Movie[]> {
    return this.httpClient.get<Pagination<MovieApiResponse>>(`${environment.apiUrl}/movie/${category}?page=${page}`)
      .pipe(
        map((value: Pagination<MovieApiResponse>) => value.results),
      map((movies: MovieApiResponse[]) => movies.map(movie => ({
            ...this.apiUtilsService.rewriteProperties<Movie>(movie),
            imageUrl: this.imageService.getUrl(movie.poster_path as string)
          })
        ))
      );
  }

  getRecommendations(id: number): Observable<Movie[]> {
    return this.httpClient.get<Pagination<MovieApiResponse>>(`${environment.apiUrl}/movie/${id}/recommendations`)
      .pipe(
        map((value: Pagination<MovieApiResponse>) => value.results),
      map((movies: MovieApiResponse[]) => movies.map(movie => ({
            ...this.apiUtilsService.rewriteProperties<Movie>(movie),
            imageUrl: this.imageService.getUrl(movie.poster_path as string)
          })
        ))
      );
  }

  getById(id: number): Observable<Movie> {
    return this.httpClient.get<MovieApiResponse>(`${environment.apiUrl}/movie/${id}`)
      .pipe(
        map((movie: MovieApiResponse) => ({
            ...this.apiUtilsService.rewriteProperties<Movie>(movie),
            imageUrl: this.imageService.getUrl(movie.poster_path as string),
            backdropUrl: this.imageService.getBackdropUrl(movie.backdrop_path as string),
          })
        )
      );
  }

  search(query: string, page = 1): Observable<Movie[]> {
    return this.httpClient.get<Pagination<MovieApiResponse>>(`${environment.apiUrl}/search/movie?query=${query}&page=${page}`)
    .pipe(
      map((value: Pagination<MovieApiResponse>) => value.results),
    map((movies: MovieApiResponse[]) => movies.map(movie => ({
          ...this.apiUtilsService.rewriteProperties<Movie>(movie),
          imageUrl: this.imageService.getUrl(movie.poster_path as string)
        })
      ))
    );
  }

  getCredits(id: number): Observable<Character[]> {
    return this.httpClient.get<{ cast: CharacterApiResponse[] }>(`${environment.apiUrl}/movie/${id}/credits`)
      .pipe(
        map((value: { cast: CharacterApiResponse[] }) => value.cast),
        map((characters: CharacterApiResponse[]) => characters.map(character => ({
          ...this.apiUtilsService.rewriteProperties<Character>(character),
          imageUrl: this.imageService.getUrl(character.profile_path as string)
        })
      )))
  }

}
