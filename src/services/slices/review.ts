import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import {
  review,
  TLikeAddResponse,
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

type TReviewState = {
  create: {
    isLoading: boolean;
  },
  update: {
    isLoading: boolean;
  }
};

const initialState: TReviewState = {
  create: {
    isLoading: false
  },
  update: {
    isLoading: false
  },
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

  }
});

export default reviewSlice.reducer;
