import { getPoster, TMovieData, TMovies } from '../api';
import { movies, getBackdrop } from '../api';
import { AppDispatch, AppThunk, RootState } from '../store';

export enum HomeActionTypes {
  FULFILLED = 'HOME_FULFILLED',
  PENDING = 'HOME_PENDING',
  ERROR = 'HOME_ERROR'
};

type TEntity = 'featured' | 'upcoming' | 'topRated' | 'popular';

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
      items.forEach((item) => {
        item.backdrop_path = getBackdrop(item.backdrop_path, 1280);
      })
      dispatch(setFulfilled('featured', items));
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
      results.forEach((item) => {
        item.poster_path = getPoster(item.poster_path, 185 );
      })
      dispatch(setFulfilled('popular', results));
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
      results.forEach((item) => {
        item.poster_path = getPoster(item.poster_path, 185 );
      })
      dispatch(setFulfilled('topRated', results));
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
      results.forEach((item) => {
        item.poster_path = getPoster(item.poster_path, 185 );
      })
      dispatch(setFulfilled('upcoming', results));
    } catch (err: any) {
      dispatch(setError('upcoming', err.message));
    }
  }
};
