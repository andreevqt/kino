export type TMovieData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TGenre = {
  id: number;
  name: string;
};

export type TCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type TLanguange = {
  iso_639_1: string;
  name: string;
};

export type TCountry = {
  iso_3166_1: string;
  name: string;
};

export type TMovieDataFull = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: number | null;
  budget: number;
  genres: TGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: TCompany[];
  production_countries: TCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: TLanguange[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMovies = TMovieData[];

export type TTMDBResponse = {
  page: number;
  total_pages: number;
  total_results: number;
};

export type TPopularMovies = TTMDBResponse & { results: TMovies };
