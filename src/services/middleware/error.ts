import { Middleware } from 'redux';
import { setError } from "../slices/common";

const error: Middleware = ({ getState, dispatch }) => (next) => (action) => {
  if (action.type === 'common/setError' || action.type.endsWith('/rejected')) {
    return next(action);
  }

  const { lastErr } = getState().common;
  if (lastErr) {
    dispatch(setError(undefined));
  }
  
  next(action);
};

export default error;
