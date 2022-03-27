import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { review, TReview } from '../api';
import { TConfig } from '../store';
import { setError } from './common';

export const get = createAsyncThunk<TReview, number, TConfig>(
  'single-review/get',
  async (id, thunkAPI) => {
    try {
      const response = await review.get(id);
      return response.review;
    } catch (err) {
      thunkAPI.dispatch(setError(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export type TSingleReviewState = {
  review: TReview | undefined;
  isLoading: boolean;
};

const initialState: TSingleReviewState = {
  review: undefined,
  isLoading: false
};

export const reviewSlice = createSlice({
  name: 'single-review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(get.fulfilled, (state, action) => {
      state.review = action.payload;
      state.isLoading = false;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.review = undefined;
      state.isLoading = false;
    });
  }
});

export default reviewSlice.reducer;
