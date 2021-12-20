import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { internet, system } from 'faker';
import { ConfigurationService } from './configuration.service';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;
  let configurationService: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    configurationService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    service = TestBed.inject(ImageService);
    expect(service).toBeTruthy();
  });

  it('should return image url for window width less than or equal 320px', () => {
    Object.assign(window, { innerWidth: 320 })
    service = TestBed.inject(ImageService);
    const baseUrl = internet.url();
    const filePath = system.filePath();
    jest.spyOn(configurationService, 'getConfiguration').mockReturnValue(baseUrl);
    const imageUrl = service.getUrl(filePath);
    expect(imageUrl).toBe(`${baseUrl}w92${filePath}`);
  })

  it('should return image url for window width bigger than 320px and less than or equal 768px', () => {
    Object.assign(window, { innerWidth: 500 })
    service = TestBed.inject(ImageService);
    const baseUrl = internet.url();
    const filePath = system.filePath();
    jest.spyOn(configurationService, 'getConfiguration').mockReturnValue(baseUrl);
    const imageUrl = service.getUrl(filePath);
    expect(imageUrl).toBe(`${baseUrl}w154${filePath}`);
  })

  it('should return image url for window width bigger than 768px and less than or equal 1142px', () => {
    Object.assign(window, { innerWidth: 800 })
    service = TestBed.inject(ImageService);
    const baseUrl = internet.url();
    const filePath = system.filePath();
    jest.spyOn(configurationService, 'getConfiguration').mockReturnValue(baseUrl);
    const imageUrl = service.getUrl(filePath);
    expect(imageUrl).toBe(`${baseUrl}w342${filePath}`);
  })

  it('should return image url for window width bigger than 1142px', () => {
    Object.assign(window, { innerWidth: 1440 })
    service = TestBed.inject(ImageService);
    const baseUrl = internet.url();
    const filePath = system.filePath();
    jest.spyOn(configurationService, 'getConfiguration').mockReturnValue(baseUrl);
    const imageUrl = service.getUrl(filePath);
    expect(imageUrl).toBe(`${baseUrl}w342${filePath}`);
  })

  it('should return backdrop image url', () => {
    service = TestBed.inject(ImageService);
    const baseUrl = internet.url();
    const filePath = system.filePath();
    jest.spyOn(configurationService, 'getConfiguration').mockReturnValue(baseUrl);
    const backdropUrl = service.getBackdropUrl(filePath);
    expect(backdropUrl).toBe(`${baseUrl}w300${filePath}`);
  })
});
