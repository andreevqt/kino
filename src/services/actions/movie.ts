import { Action } from 'redux';
import { getBackdrop, getPoster, movies, TMovieData, TMovieDataFull } from '../api';
import { AppThunk } from '../store';
import { transformMovie, transformMovies } from '../transforms';

export enum MovieActionTypes {
  FULFILLED = 'MOVIE_FULFILLED',
  PENDING = 'MOVIE_PENDING',
  ERROR = 'MOVIE_ERROR',
  PAGE_LOADED = 'MOVIE_PAGE_LOADED',
  PAGE_UNLOADED = 'MOVIE_PAGE_UNLOADED'
};

export type TEntity = 'movie' | 'similar';

export type TMovieActionFulfilled<T> = {
  entity: TEntity;
  type: MovieActionTypes.FULFILLED;
  data: T;
};

export type TMovieActionPending = {
  type: MovieActionTypes.PENDING;
  entity: TEntity;
};

export type TMovieActionError = {
  type: MovieActionTypes.ERROR;
  entity: TEntity, error: string;
};

export type TMovieActionPageLoaded = {
  type: MovieActionTypes.PAGE_LOADED;
};

export type TMovieActionPageUnloaded = {
  type: MovieActionTypes.PAGE_UNLOADED;
};

export type TMovieAction<T = {}> =
  | TMovieActionPending
  | TMovieActionError
  | TMovieActionFulfilled<T>
  | TMovieActionPageLoaded
  | TMovieActionPageUnloaded;

export const setPending = (entity: TEntity): TMovieAction => ({
  entity,
  type: MovieActionTypes.PENDING
});

export const onPageLoad = (): TMovieAction => ({
  type: MovieActionTypes.PAGE_LOADED
});

export const onPageUnload = (): TMovieAction => ({
  type: MovieActionTypes.PAGE_UNLOADED
});

export const setError = (entity: TEntity, error: string): TMovieAction => ({
  entity,
  type: MovieActionTypes.ERROR,
  error
});

export const setFulfilled = <T>(entity: TEntity, data: T): TMovieAction => ({
  entity,
  type: MovieActionTypes.FULFILLED,
  data
});

export const getMovie = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('movie'));
    try {
      const movie = await movies.get(id);
      dispatch(setFulfilled('movie', transformMovie(movie)));
    } catch (err: any) {
      dispatch(setError('movie', err.message));
    }
  }
};

export const getSimilar = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('similar'));
    try {
      const { results } = await movies.similar(id);
      dispatch(setFulfilled('similar', transformMovies(results)));
    } catch (err: any) {
      dispatch(setError('similar', err.message));
    }
  }
}
