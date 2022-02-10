import { combineReducers } from 'redux';
import { THomeState } from './home';
import home from './home';

type AppState = {
  home: THomeState;
};

export {
  type AppState
};

export default combineReducers({
  home
});
