export interface MovieApiResponse {
  poster_path?: string;
  release_date: string;
  genre_ids: string[]
  original_language: string;
  overview: string;
  title: string;
  vote_average: number;
}

export interface Movie {
  imageUrl: string;
  posterPath?: string;
  releaseDate: string;
  genreIds: string[]
  originalLanguage: string;
  overview: string;
  title: string;
  voteAverage: number;
}
