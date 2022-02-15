import { combineReducers } from 'redux';
import home, { THomeState } from './home';
import movie, { TMovieStateOuter } from './movie';

type AppState = {
  home: THomeState;
  movie: TMovieStateOuter;
};

export {
  type AppState
};

export default combineReducers({
  home,
  movie
});
