import { Action } from 'redux';
import { getBackdrop, getPoster, movies, TMovieDataFull } from '../api';
import { AppThunk } from '../store';

export enum MovieActionTypes {
  FULFILLED = 'MOVIE_FULFILLED',
  PENDING = 'MOVIE_PENDING',
  ERROR = 'MOVIE_ERROR',
  PAGE_LOADED = 'MOVIE_PAGE_LOADED',
  PAGE_UNLOADED = 'MOVIE_PAGE_UNLOADED'
};

export type TMovieAction =
  | { type: MovieActionTypes.PENDING }
  | { type: MovieActionTypes.ERROR, error: string }
  | { type: MovieActionTypes.FULFILLED, movie: TMovieDataFull }
  | { type: MovieActionTypes.PAGE_LOADED }
  | { type: MovieActionTypes.PAGE_UNLOADED };

export const setPending = (): TMovieAction => ({
  type: MovieActionTypes.PENDING
});

export const onPageLoad = (): TMovieAction => ({
  type: MovieActionTypes.PAGE_LOADED
});

export const onPageUnload = (): TMovieAction => ({
  type: MovieActionTypes.PAGE_UNLOADED
});

export const setError = (error: string): TMovieAction => ({
  type: MovieActionTypes.ERROR,
  error
});

export const setFulfilled = (movie: TMovieDataFull): TMovieAction => ({
  type: MovieActionTypes.FULFILLED,
  movie
});

export const getMovie = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending());
    try {
      const movie = await movies.get(id);
      movie.poster_path = getPoster(movie.poster_path, 342);
      movie.backdrop_path = getBackdrop(movie.backdrop_path, 1280);
      movie.status = movie.status === 'Released' ? 'Вышел' : movie.status === 'Post Production' ? 'Пост-продакшн' : movie.status;
      dispatch(setFulfilled(movie));
    } catch (err: any) {
      dispatch(setError(err.message));
    }
  }
};
