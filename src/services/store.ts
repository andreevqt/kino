import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import home from './slices/home';
import movie from './slices/movie';
import user from './slices/user';
import { Middleware } from 'redux';
import jwt from './middleware/jwt';

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    home,
    movie,
    user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        jwt
      )
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
type AppMiddleware = Middleware<{}, RootState>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  store,
  type RootState,
  type AppDispatch,
  type AppMiddleware,
  useAppDispatch,
  useAppSelector,
};
