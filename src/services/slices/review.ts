import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import {
  review,
  TLikeAddResponse,
  TReview,
  TCreateReviewAttrs,
  TCreateReviewResponse
} from '../api';
import { setError } from './common';

type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

type TCreateReviewArgs = TCreateReviewAttrs & {
  movieId: number
};

export const create = createAsyncThunk<TCreateReviewResponse, TCreateReviewArgs, TConfig>(
  'review/create',
  async ({ movieId, ...rest }, thunkAPI) => {
    try {
      const result = await review.create(movieId, rest);
      return result;
    } catch (err: any) {
      thunkAPI.dispatch(setError(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export enum TReviewMode {
  CREATING,
  EDITING
};

export type TReviewState = {
  mode: TReviewMode,
  review: TReview | undefined,
  isLoading: boolean
};

const initialState: TReviewState = {
  isLoading: false,
  review: undefined,
  mode: TReviewMode.CREATING
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setMode: (state, action) => {
      const mode = action.payload;
      state.mode = mode;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(create.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(create.pending, (state, action) => {
      state.isLoading = true;
    });
  }
});

const { setMode } = reviewSlice.actions;

export { setMode };

export default reviewSlice.reducer;
