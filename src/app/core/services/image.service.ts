import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private configurationService: ConfigurationService) { }

  // @TODO validate by resolution
  getUrl(imagePath: string): string {
      return this.configurationService.getConfiguration('baseUrl') + 'w154' + imagePath;
    }

}
