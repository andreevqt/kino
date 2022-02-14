import { MovieActionTypes, TMovieAction } from "../actions";
import { TMovieDataFull } from "../api";

export type TMovieState = {
  movie: TMovieDataFull | null;
  error: string | null;
  isPending: boolean;
};

const initialState: TMovieState = {
  movie: null,
  error: null,
  isPending: false
};

export default (state: TMovieState = initialState, action: TMovieAction): TMovieState => {
  switch (action.type) {
    case MovieActionTypes.FULFILLED: {
      const { movie } = action;
      return { ...state, movie, isPending: false };
    }
    case MovieActionTypes.PENDING: {
      return { ...state, isPending: true };
    }
    case MovieActionTypes.ERROR: {
      const { error } = action;
      return { ...initialState, error };
    }
    case MovieActionTypes.PAGE_UNLOADED: {
      return { ...initialState };
    }
    default: {
      return state;
    }
  }
};
