import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import throttle from 'lodash.throttle'
import home from './slices/home';
import movie from './slices/movie';
import user from './slices/user';
import common from './slices/common';
import editReview from './slices/edit-review';
import singleReview from './slices/single-review';
import { Middleware } from 'redux';
import error from './middleware/error';
import { loadState, saveState } from './local-storage';

const preloadedState = loadState();
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(error),
  reducer: {
    home,
    movie,
    user,
    common,
    editReview,
    singleReview
  },
  preloadedState
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppMiddleware = Middleware<{}, RootState>;
type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

store.subscribe(throttle(() => {
  const { user } = store.getState()
  saveState({ user });
}, 1000));

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  store,
  type RootState,
  type AppDispatch,
  type AppMiddleware,
  type TConfig,
  useAppDispatch,
  useAppSelector,
};
