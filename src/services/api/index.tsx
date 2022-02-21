import axios from './axios';
import normalizeUrl from 'normalize-url';
import {
  TMovies,
  TMovieData,
  TMovieDataFull,
  TMoviesResponse,
  TLoginResponse,
  TUser,
  TLogoutResponse,
  TUserReponse,
  TRefreshResponse,
  TTokens
} from './response-types';

type TBackdropSizes = 300 | 780 | 1280 | 'original';
type TPosterSizes = 92 | 154 | 185 | 342 | 500 | 780 | 'original';

export const getBackdrop = (path: string | null, size: TBackdropSizes = 'original'): string => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const getPoster = (path: string | null, size: TPosterSizes = 'original'): string => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const movies = {
  featured: () => axios.public.get<TMovies>('/movies/featured').then((response) => response.data),
  popular: () => axios.public.get<TMoviesResponse>('/movies/popular').then((response) => response.data.results),
  topRated: () => axios.public.get<TMoviesResponse>('/movies/top_rated').then((response) => response.data.results),
  upcoming: () => axios.public.get<TMoviesResponse>('/movies/upcoming').then((response) => response.data.results),
  playing: () => axios.public.get<TMoviesResponse>('/movies/playing').then((response) => response.data.results),
  get: (id: number) => axios.public.get<TMovieDataFull>(`/movies/${id}`).then((response) => response.data),
  credits: (id: number) => axios.public.get<TMovieDataFull>(`/movies/credits/${id}`).then((response) => response.data),
  similar: (id: number) => axios.public.get<TMoviesResponse>(`/movies/${id}/similar`).then((response) => response.data)
};

export const user = {
  login: (email: string, password: string) => axios.public.post<TLoginResponse>('/users/login', { email, password }).then((response) => response.data.user),
  logout: (token: string) => axios.public.post<TLogoutResponse>('/users/logout', { token }),
  refresh: (token: string) => axios.public.post<TRefreshResponse>('/users/token', { token }).then((response) => response.data.tokens),
  get: () => axios.private.get<TUserReponse>(`/users`).then((response) => response.data.user)
};

export {
  type TMovieData,
  type TMovieDataFull,
  type TMovies,
  type TMoviesResponse as TPopularMovies,
  type TLoginResponse,
  type TRefreshResponse,
  type TUser,
  type TTokens
};
