import { ListItem } from "src/app/shared/components/list-item/list-item.model";

export interface Genre {
  id: number;
  name: string;
}

export interface MovieApiResponse {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  release_date: string;
  genres: Genre[];
  original_language: string;
  overview: string;
  title: string;
  vote_average: number;
}

export interface Movie extends ListItem {
  id: number;
  imageUrl: string;
  backdropUrl?: string;
  posterPath?: string;
  releaseDate: string;
  genres: Genre[];
  originalLanguage: string;
  overview: string;
  title: string;
  voteAverage: number;
}
