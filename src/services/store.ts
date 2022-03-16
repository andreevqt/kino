import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import home from './slices/home';
import movie from './slices/movie';
import user from './slices/user';
import common from './slices/common';
import review from './slices/review';
import { Middleware } from 'redux';
import error from './middleware/error';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(error),
  reducer: {
    home,
    movie,
    user,
    common,
    review
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppMiddleware = Middleware<{}, RootState>;
type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

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
