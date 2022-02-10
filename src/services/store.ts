import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { compose, createStore, applyMiddleware, AnyAction, Dispatch } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import rootReducer, { AppState } from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

type RootState = typeof store.getState;
type AppDispatch = typeof store.dispatch;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

const useAppDispatch = () => useDispatch();
const useThunkDispatch = () => useDispatch<AppThunk>();
const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export {
  store,
  type RootState,
  type AppDispatch,
  type AppThunk,
  useAppDispatch,
  useAppSelector,
  useThunkDispatch
};
