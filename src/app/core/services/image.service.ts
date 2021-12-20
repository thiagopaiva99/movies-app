import { Injectable } from '@angular/core';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private posterImageSize!: string;

  constructor(private configurationService: ConfigurationService) {
    this.posterImageSize = this.getPosterSizeForResolution()
  }

    private getPosterSizeForResolution() {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 320) {
      return 'w92'
    }

    if (windowWidth > 320 && windowWidth <= 768) {
      return 'w154'
    }

    if (windowWidth > 768 && windowWidth <= 1142) {
      return 'w342'
    }

    return 'w342'
  }

  getUrl(imagePath: string): string {
    return this.configurationService.getConfiguration('baseUrl') + this.posterImageSize + imagePath;
  }

  getBackdropUrl(backdropPath: string): string {
    return this.configurationService.getConfiguration('baseUrl') + 'w300' + backdropPath;
  }

}
