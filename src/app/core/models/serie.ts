import { ListItem } from "src/app/shared/components/list-item/list-item.model";

export interface SerieApiResponse {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
}

export interface Serie extends ListItem {
  id: number;
  imageUrl: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
}
