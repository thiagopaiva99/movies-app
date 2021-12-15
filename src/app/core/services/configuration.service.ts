import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Configuration, ImageConfiguration, ImageConfigurationApiResponse } from '../models';
import { ApiUtilsService } from './api-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private configuration: Map<string, string> = new Map();

  constructor(private httpClient: HttpClient, private apiUtilsService: ApiUtilsService) { }

  getConfiguration(key: string) {
    return this.configuration.get(key);
  }

  setConfiguration() {
    // @TODO should be destroyed
    this.httpClient.get<Configuration>(`https://api.themoviedb.org/3/configuration`)
      .pipe(map((configuration: Configuration) => configuration.images),
      map((imagesConfiguration: ImageConfigurationApiResponse) => this.apiUtilsService.rewriteProperties<ImageConfiguration>(imagesConfiguration)),
      tap((imageConfiguration: ImageConfiguration) => {
        Object.entries(imageConfiguration).forEach(([key, value]) => this.configuration.set(key, value));
        console.log(this.configuration)
      }))
      .subscribe(() => {

      })
  }

}
