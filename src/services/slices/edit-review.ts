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

export type TReviewState = {
  review: TReview | undefined
};

const initialState: TReviewState = {
  review: undefined,
};

export const reviewSlice = createSlice({
  name: 'edit-review',
  initialState,
  reducers: {}
});

export default reviewSlice.reducer;
