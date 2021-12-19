import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pagination, Serie, SerieApiResponse } from '../models';
import { ApiUtilsService } from './api-utils.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  constructor(private httpClient: HttpClient, private apiUtilsService: ApiUtilsService, private imageService: ImageService) { }

  getSeries(page = 1): Observable<Serie[]> {
    return this.httpClient.get<Pagination<SerieApiResponse>>(`${environment.apiUrl}/tv/popular?page=${page}`)
      .pipe(
        map((value: Pagination<SerieApiResponse>) => value.results),
      map((series: SerieApiResponse[]) => series.map(serie => ({
            ...this.apiUtilsService.rewriteProperties<Serie>(serie),
            imageUrl: this.imageService.getUrl(serie.poster_path as string),
            title: serie.name,
            releaseDate: serie.first_air_date,
          })
        ))
      );
  }
}
