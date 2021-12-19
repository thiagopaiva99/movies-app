import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
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
    this.httpClient.get<Configuration>(`${environment.apiUrl}/configuration`)
      .pipe(map((configuration: Configuration) => configuration.images),
      map((imagesConfiguration: ImageConfigurationApiResponse) => this.apiUtilsService.rewriteProperties<ImageConfiguration>(imagesConfiguration)),
      tap((imageConfiguration: ImageConfiguration) => {
        Object.entries(imageConfiguration).forEach(([key, value]) => this.configuration.set(key, value));
      }),
      first())
      .subscribe(() => {})
  }

}
