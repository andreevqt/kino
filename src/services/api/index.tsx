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
  TTokens,
  TCreateUserReponse,
  TReview,
  TComment,
  TCreateReviewResponse,
  TGetReviewResponse,
  TReviewsListResponse,
  TLikeAddResponse,
  TCommentsListResponse
} from './response-types';
import { transformMovie, transformMovies } from '../transforms';

type TBackdropSizes = 300 | 780 | 1280 | 'original';
type TPosterSizes = 92 | 154 | 185 | 342 | 500 | 780 | 'original';

export const getBackdrop = (path: string | null, size: TBackdropSizes = 'original') => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const getPoster = (path: string | null, size: TPosterSizes = 'original') => {
  return path ? normalizeUrl(`https://image.tmdb.org/t/p/w${size}/${path}`) : '';
};

export const movies = {
  featured: () => axios.public
    .get<TMovies>('/movies/featured', {
      transformResponse: (data) => transformMovies(JSON.parse(data))
    })
    .then((response) => response.data),

  popular: () => axios.public
    .get<TMovies>('/movies/popular', {
      transformResponse: (data) => transformMovies(JSON.parse(data).results)
    })
    .then((response) => response.data),

  topRated: () => axios.public
    .get<TMovies>('/movies/top_rated', {
      transformResponse: (data) => transformMovies(JSON.parse(data).results)
    })
    .then((response) => response.data),

  upcoming: () => axios.public
    .get<TMovies>('/movies/upcoming', {
      transformResponse: (data) => transformMovies(JSON.parse(data).results)
    })
    .then((response) => response.data),

  playing: () => axios.public
    .get<TMovies>('/movies/playing', {
      transformResponse: (data) => transformMovies(JSON.parse(data).results)
    })
    .then((response) => response.data),

  get: (id: number) => axios.public
    .get<TMovieDataFull>(`/movies/${id}`, {
      transformResponse: (data) => transformMovie(JSON.parse(data))
    })
    .then((response) => response.data),

  credits: (id: number) => axios.public
    .get<TMovieDataFull>(`/movies/credits/${id}`)
    .then((response) => response.data),

  similar: (id: number) => axios.public
    .get<TMovies>(`/movies/${id}/similar`, {
      transformResponse: (data) => transformMovies(JSON.parse(data).results)
    })
    .then((response) => response.data),

  reviews: (id: number, page: number = 1) => axios.private
    .get<TReviewsListResponse>(`/movies/${id}/reviews`, { params: { page } })
    .then((response) => response.data)
};

export const user = {
  create: (email: string, password: string, name: string) => axios.public
    .post<TCreateUserReponse>('/users', { email, password, name })
    .then((response) => response.data.user),

  login: (email: string, password: string) => axios.public
    .post<TLoginResponse>('/users/login', { email, password })
    .then((response) => response.data.user),

  logout: (token: string) => axios.public
    .post<TLogoutResponse>('/users/logout', { token }),

  refresh: (token: string) => axios.public
    .post<TRefreshResponse>('/users/token', { token })
    .then((response) => response.data.tokens),

  get: () => axios.private
    .get<TUserReponse>(`/users`)
    .then((response) => response.data.user)
};

export type TCreateReviewAttrs = {
  title: string;
  content: string;
};

export const review = {
  get: (reviewId: number) => axios.private
    .get<TGetReviewResponse>(`/reviews/${reviewId}`)
    .then((response) => response.data),

  comments: (reviewId: number, page: number) => axios.private
    .get<TCommentsListResponse>(`/reviews/${reviewId}/comments`, { params: { page } })
    .then((response) => response.data),

  create: (movieId: number, data: TCreateReviewAttrs) => axios.private
    .post<TCreateReviewResponse>(`/movies/${movieId}/reviews`, data)
    .then((response) => response.data),

  like: {
    add: (reviewId: number) => axios.private
      .post<TLikeAddResponse>(`/reviews/${reviewId}/likes`)
      .then((response) => response.data)
  }
};

export {
  type TMovieData,
  type TMovieDataFull,
  type TMovies,
  type TMoviesResponse as TPopularMovies,
  type TLoginResponse,
  type TRefreshResponse,
  type TCreateReviewResponse,
  type TGetReviewResponse,
  type TReviewsListResponse,
  type TCommentsListResponse,
  type TUser,
  type TReview,
  type TComment,
  type TLikeAddResponse,
  type TTokens
};
