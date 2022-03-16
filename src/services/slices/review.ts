import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import {
  review,
  TLikeAddResponse,
  TCreateReviewAttrs,
  TCreateReviewResponse,
  TReview
} from '../api';
import { setError } from './common';
import { TGetReviewResponse } from '../api/response-types';

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
      return review.create(movieId, rest);
    } catch (err: any) {
      thunkAPI.dispatch(setError(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const get = createAsyncThunk<TReview, number, TConfig>(
  'review/get',
  async (reviewId, thunkAPI) => {
    try {
      const { review: result } = await review.get(reviewId);
      return result;
    } catch (err: any) {
      thunkAPI.dispatch(setError(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

type TReviewState = {
  create: {
    isLoading: boolean;
  },
  update: {
    isLoading: boolean;
  },
  single: {
    isLoading: boolean;
    review: TReview | undefined;
  }
};

const initialState: TReviewState = {
  create: {
    isLoading: false
  },
  update: {
    isLoading: false
  },
  single: {
    isLoading: false,
    review: undefined
  }
};

export const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(create.fulfilled, (state, action) => {
      state.create.isLoading = false;
    });
    builder.addCase(create.rejected, (state, action) => {
      state.create.isLoading = false;
    });
    builder.addCase(create.pending, (state, action) => {
      state.create.isLoading = true;
    });

    builder.addCase(get.fulfilled, (state, action) => {
      const review = action.payload;
      state.single.isLoading = false;
      state.single.review = review;
    });
    builder.addCase(get.rejected, (state, action) => {
      state.single.isLoading = false;
    });
    builder.addCase(get.pending, (state, action) => {
      state.single.isLoading = true;
    });

  }
});

export default reviewSlice.reducer;
