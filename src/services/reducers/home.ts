import { TMovieData } from '../api';
import { THomeAction, HomeActionTypes } from '../actions';

export type THomeEntry = {
  items: Array<TMovieData>;
  isPending: boolean;
  error: string | null;
};

export type THomeState = {
  featured: THomeEntry;
  popular: THomeEntry;
  topRated: THomeEntry;
  upcoming: THomeEntry;
  playing: THomeEntry;
};

const defaults: THomeEntry = {
  items: [],
  isPending: false,
  error: null
};

const initialState: THomeState = {
  featured: { ...defaults },
  popular: { ...defaults },
  topRated: { ...defaults },
  upcoming: { ...defaults },
  playing: { ...defaults }
};

export default (state: THomeState = initialState, action: THomeAction) => {
  switch (action.type) {
    case HomeActionTypes.FULFILLED: {
      const entity = action.entity;
      const items = action.items;
      return { ...state, [entity]: { ...state[entity], items, isPending: false } };
    }
    case HomeActionTypes.PENDING: {
      const entity = action.entity;
      return { ...state, [entity]: { ...state[entity], isPending: true } };
    }
    case HomeActionTypes.ERROR: {
      const entity = action.entity;
      const error = action.error;
      return { ...state, [entity]: { ...initialState[entity], error } };
    }
    default: {
      return state;
    }
  }
};
