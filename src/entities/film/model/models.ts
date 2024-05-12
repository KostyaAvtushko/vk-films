export type IFilm = {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  original_language: string;
  budget: number;
  origin_country?: string[];
  production_companies: IProductionCompany[];
}

export type IFilmListItem = Omit<IFilm, 
  'budget' | 
  'origin_country' | 
  'production_companies' | 
  'original_language' | 
  'release_date' | 
  'original_title' |
  'genres' 
>;

type Genre = {
  id: number;
  name: string;
}

type IProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}