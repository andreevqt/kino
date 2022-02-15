import { getPoster, TMovieData, TMovies } from '../api';
import { movies, getBackdrop } from '../api';
import { AppDispatch, AppThunk, RootState } from '../store';
import { transformMovies } from '../transforms';

export enum HomeActionTypes {
  FULFILLED = 'HOME_FULFILLED',
  PENDING = 'HOME_PENDING',
  ERROR = 'HOME_ERROR'
};

type TEntity = 'featured' | 'upcoming' | 'topRated' | 'popular' | 'playing';

type THomeActionBase = {
  entity: TEntity;
};

type THomeActionFulfilled = THomeActionBase & {
  type: HomeActionTypes.FULFILLED;
  items: Array<TMovieData>;
};

type THomeActionPending = THomeActionBase & {
  type: HomeActionTypes.PENDING;
};

type THomeActionError = THomeActionBase & {
  type: HomeActionTypes.ERROR;
  error: string;
};

export type THomeAction =
  | THomeActionFulfilled
  | THomeActionPending
  | THomeActionError;

const setPending = (entity: TEntity): THomeAction => ({
  type: HomeActionTypes.PENDING,
  entity
});

const setError = (entity: TEntity, error: string): THomeAction => ({
  type: HomeActionTypes.ERROR,
  entity,
  error
});

const setFulfilled = (entity: TEntity, items: TMovies): THomeAction => ({
  type: HomeActionTypes.FULFILLED,
  entity,
  items
});

export const getFeaturedMovies = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('featured'));
    try {
      const items = await movies.featured();
      dispatch(setFulfilled('featured', transformMovies(items)));
    } catch (err: any) {
      dispatch(setError('featured', err.message));
    }
  }
};

export const getPopularMovies = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('popular'));
    try {
      const { results } = await movies.popular();
      dispatch(setFulfilled('popular', transformMovies(results)));
    } catch (err: any) {
      dispatch(setError('popular', err.message));
    }
  }
};

export const getTopRatedMovies = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('topRated'));
    try {
      const { results } = await movies.topRated();
      dispatch(setFulfilled('topRated', transformMovies(results)));
    } catch (err: any) {
      dispatch(setError('topRated', err.message));
    }
  }
};

export const getUpcomingMovies = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('upcoming'));
    try {
      const { results } = await movies.upcoming();
      dispatch(setFulfilled('upcoming', transformMovies(results)));
    } catch (err: any) {
      dispatch(setError('upcoming', err.message));
    }
  }
};

export const getPlayingMovies = (): AppThunk => {
  return async (dispatch) => {
    dispatch(setPending('playing'));
    try {
      const { results } = await movies.playing();
      dispatch(setFulfilled('playing', transformMovies(results)));
    } catch (err: any) {
      dispatch(setError('playing', err.message));
    }
  }
};

