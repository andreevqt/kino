import { decode } from '../jwt';
import { refresh } from '../slices/user';
import { Middleware } from 'redux';

const isExpired = (token: string) => {
  const splited = token.split(' ')[1];
  const { exp } = decode(splited);
  const current = Date.now() / 1000;
  return current > exp;
};

const jwt: Middleware = ({ getState, dispatch }) => (next) => (action) => {
  if (typeof action === 'function') {
    const { accessToken, isLoading } = getState().user;
    if (isLoading) {
      next(action);
      return;
    }
    if (accessToken) {
      // accessToken is present, checking for expiration 
      if (isExpired(accessToken)) {
        refresh()(dispatch, getState, undefined).then(() => next(action));
        return;
      };
    } else {
      // no accessToken, trying to get new
      refresh()(dispatch, getState, undefined).then(() => next(action));
      return;
    }
  }

  next(action);
};

export default jwt;
