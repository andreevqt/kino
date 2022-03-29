import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { review, TReview, TComment, TCommentsListResponse } from '../api';
import { TConfig } from '../store';
import { setError } from './common';

export const getReviewById = createAsyncThunk<TReview, number, TConfig>(
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

export const getCommentsByReview = createAsyncThunk<TCommentsListResponse, number, TConfig>(
  'single-review/comments',
  async (reviewId, thunkAPI) => {
    try {
      return review.comments(reviewId);
    } catch (err) {
      thunkAPI.dispatch(setError(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export type TSingleReviewState = {
  review: TReview | undefined;
  isLoading: boolean;
  comments: {
    isLoading: boolean;
    items: TComment[];
  };
};

const initialState: TSingleReviewState = {
  review: undefined,
  isLoading: false,
  comments: {
    isLoading: false,
    items: []
  }
};

export const reviewSlice = createSlice({
  name: 'single-review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getReviewById.fulfilled, (state, action) => {
      state.review = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getReviewById.rejected, (state, action) => {
      state.review = undefined;
      state.isLoading = false;
    });

    builder.addCase(getCommentsByReview.pending, (state, action) => {
      state.comments.isLoading = false;
    });
    builder.addCase(getCommentsByReview.fulfilled, (state, action) => {
      const { results } = action.payload;
      state.comments.items = results;
      state.comments.isLoading = false;
    });
    builder.addCase(getCommentsByReview.rejected, (state, action) => {
      state.comments.items = [];
      state.comments.isLoading = false;
    });
  }
});

export default reviewSlice.reducer;
