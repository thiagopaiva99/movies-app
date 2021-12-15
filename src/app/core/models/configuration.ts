export interface ImageConfigurationApiResponse {
  base_url: string;
  poster_sizes: string[];
}

export interface ImageConfiguration {
  baseUrl: string;
  posterSizes: string[];
}

export interface Configuration {
  images: ImageConfigurationApiResponse;
}
