import axios from './axios';
import { TMovies, TMovieData, TPopularMovies } from './response-types';
import normalizeUrl from 'normalize-url';

export const getBackdrop = (path: string, size: 300 | 780 | 1280 | 'original' = 'original'): string => {
  return normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`);
};

export const getPoster = (path: string, size: 92 | 154 | 185 | 342 | 500 | 780 | 'original' = 'original'): string => {
  return normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`);
};

export const movies = {
  featured: () => axios.get<TMovies>('/movies/featured').then((response) => response.data),
  popular: () => axios.get<TPopularMovies>('/movies/popular').then((response) => response.data),
  topRated: () => axios.get<TPopularMovies>('/movies/top_rated').then((response) => response.data),
  upcoming: () => axios.get<TPopularMovies>('/movies/upcoming').then((response) => response.data)
};

export {
  type TMovieData,
  type TMovies,
  type TPopularMovies
};
