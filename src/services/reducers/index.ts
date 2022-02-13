import { combineReducers } from 'redux';
import home, { THomeState } from './home';
import movie, { TMovieState } from './movie';

type AppState = {
  home: THomeState;
  movie: TMovieState;
};

export {
  type AppState
};

export default combineReducers({
  home,
  movie
});
