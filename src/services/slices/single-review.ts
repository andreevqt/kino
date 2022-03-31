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
  async (reviewId, { dispatch, rejectWithValue, getState }) => {
    const { page } = getState().singleReview.comments;
    try {
      return review.comments(reviewId, page);
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export type TSingleReviewState = {
  review: TReview | undefined;
  isLoading: boolean;
  comments: {
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    items: TComment[];
  };
};

const initialState: TSingleReviewState = {
  review: undefined,
  isLoading: false,
  comments: {
    page: 1,
    hasMore: true,
    isLoading: false,
    items: []
  }
};

export const reviewSlice = createSlice({
  name: 'single-review',
  initialState,
  reducers: {
    resetReview: (state) => {
      return initialState;
    }
  },
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
      state.comments.isLoading = true;
    });
    builder.addCase(getCommentsByReview.fulfilled, ({ comments }, action) => {
      const { results, page, totalPages } = action.payload;

      comments.isLoading = false;
      comments.items = [...comments.items, ...results];

      if (comments.page < totalPages) {
        comments.page++;
      }

      comments.hasMore = totalPages > page;
    });
    builder.addCase(getCommentsByReview.rejected, (state, action) => {
      state.comments.items = [];
      state.comments.isLoading = false;
    });
  }
});

const { resetReview } = reviewSlice.actions

export { resetReview };

export default reviewSlice.reducer;
