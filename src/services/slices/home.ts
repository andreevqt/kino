import { createAsyncThunk, createSlice, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { movies, TMovieData } from '../api';
import { transformMovies } from '../transforms';
import { RootState, AppDispatch } from '../store';

type TEntity = 'featured' | 'playing' | 'upcoming' | 'popular' | 'topRated';

type TMeta = {
  type: TEntity;
};

type TThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  pendingMeta: TMeta;
  fulfilledMeta: TMeta;
  rejectedMeta: TMeta;
};

export const createFetch = (entity: TEntity) => createAsyncThunk<TMovieData[], undefined, TThunkConfig>(
  `home/fetch${entity}`,
  async (arg, thunkAPI) => {
    try {
      const items = await movies[entity]();
      return thunkAPI.fulfillWithValue(transformMovies(items), { type: entity });
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message, { type: entity });
    }
  },
  {
    getPendingMeta: () => ({ type: entity })
  }
);

type TAsynkThunk = AsyncThunk<TMovieData[], undefined, TThunkConfig>;
type TPendingAction = ReturnType<TAsynkThunk['pending']>;
type TRejectedAction = ReturnType<TAsynkThunk['rejected']>;
type TFulfilledAction = ReturnType<TAsynkThunk['fulfilled']>;

const isPendingAction = (action: AnyAction): action is TPendingAction => {
  return action.type.startsWith('home') && action.type.endsWith('/pending');
};

const isRejectedAction = (action: AnyAction): action is TRejectedAction => {
  return action.type.startsWith('home') && action.type.endsWith('/rejected');
};

const isFulfilledAction = (action: AnyAction): action is TFulfilledAction => {
  return action.type.startsWith('home') && action.type.endsWith('/fulfilled');
};

type THomeEntry = {
  items: TMovieData[];
  isLoading: boolean;
  error: string | undefined;
};

type HomeState = {
  featured: THomeEntry;
  playing: THomeEntry;
  upcoming: THomeEntry;
  popular: THomeEntry;
  topRated: THomeEntry;
};

const initialState: HomeState = {
  featured: {
    items: [],
    isLoading: false,
    error: undefined
  },
  playing: {
    items: [],
    isLoading: false,
    error: undefined
  },
  upcoming: {
    items: [],
    isLoading: false,
    error: undefined
  },
  popular: {
    items: [],
    isLoading: false,
    error: undefined
  },
  topRated: {
    items: [],
    isLoading: false,
    error: undefined
  }
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPendingAction, (state, action) => {
        const type = action.meta.type;
        state[type].isLoading = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        const type = action.meta.type;
        if (type) {
          state[type].isLoading = false;
          state[type].error = action.error.message;
        }
      })
      .addMatcher(isFulfilledAction, (state, action) => {
        const type = action.meta.type;
        state[type].isLoading = false;
        state[type].items = action.payload;
      });
  }
});

export default homeSlice.reducer;
