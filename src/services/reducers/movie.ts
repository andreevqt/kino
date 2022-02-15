import { MovieActionTypes, TMovieAction } from "../actions";
import { TMovieDataFull, TMovieData } from "../api";

type TMovieState = {
  isPending: boolean;
  data: TMovieDataFull | null;
  error: string | null;
};

type TSimilarState = {
  isPending: boolean;
  items: TMovieData[];
  error: string | null;
};

export type TMovieStateOuter = {
  movie: TMovieState;
  similar: TSimilarState;
};

const initialState: TMovieStateOuter = {
  movie: {
    data: null,
    isPending: false,
    error: null
  },
  similar: {
    items: [],
    isPending: false,
    error: null
  }
};

const reduceMovie = (state: TMovieState, action: TMovieAction): TMovieState => {
  switch (action.type) {
    case MovieActionTypes.FULFILLED: {
      const { data } = action;
      return {
        ...state,
        isPending: false,
        data: (data as TMovieDataFull)
      };
    }
    case MovieActionTypes.PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case MovieActionTypes.ERROR: {
      const { error } = action;
      return {
        ...state,
        isPending: false,
        error
      };
    }
    default: {
      return state;
    }
  }
};

const reduceSimilar = (state: TSimilarState, action: TMovieAction): TSimilarState => {
  switch (action.type) {
    case MovieActionTypes.FULFILLED: {
      const { data } = action;
      return {
        ...state,
        isPending: false,
        items: (data as TMovieData[])
      };
    }
    case MovieActionTypes.PENDING: {
      return {
        ...state,
        isPending: true
      };
    }
    case MovieActionTypes.ERROR: {
      const { error } = action;
      return {
        ...state,
        error
      };
    }
    default: {
      return state;
    }
  }
};

export default (state: TMovieStateOuter = initialState, action: TMovieAction): TMovieStateOuter => {
  switch (action.type) {
    case MovieActionTypes.FULFILLED:
    case MovieActionTypes.PENDING:
    case MovieActionTypes.ERROR: {
      const { entity } = action;
      if (entity === 'movie') {
        return {
          ...state,
          movie: reduceMovie(state[entity], action)
        };
      }
      return {
        ...state,
        similar: reduceSimilar(state[entity], action)
      };
    }
    case MovieActionTypes.PAGE_UNLOADED: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
