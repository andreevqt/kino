import axios from './axios';
import { TMovies, TMovieData, TMovieDataFull, TPopularMovies } from './response-types';
import normalizeUrl from 'normalize-url';

type TBackdropSizes = 300 | 780 | 1280 | 'original';
type TPosterSizes = 92 | 154 | 185 | 342 | 500 | 780 | 'original';

export const getBackdrop = (path: string | null, size: TBackdropSizes = 'original'): string => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const getPoster = (path: string | null, size: TPosterSizes = 'original'): string => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const movies = {
  featured: () => axios.get<TMovies>('/movies/featured').then((response) => response.data),
  popular: () => axios.get<TPopularMovies>('/movies/popular').then((response) => response.data),
  topRated: () => axios.get<TPopularMovies>('/movies/top_rated').then((response) => response.data),
  upcoming: () => axios.get<TPopularMovies>('/movies/upcoming').then((response) => response.data),
  get: (id: number) => axios.get<TMovieDataFull>(`/movies/${id}`).then((response) => response.data),
  credits: (id: number) => axios.get<TMovieDataFull>(`/movies/credits/${id}`).then((response) => response.data),
};

export {
  type TMovieData,
  type TMovieDataFull,
  type TMovies,
  type TPopularMovies
};
