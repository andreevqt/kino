import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TMovieData, TMovieDataFull, movies, TReviewsListResponse, TReview, TLikeAddResponse, review } from '../api';
import { RootState, AppDispatch } from '../store';
import { setError } from './common';

type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const fetchMovie = createAsyncThunk<TMovieDataFull, number, TConfig>(
  'movie/get',
  async (id, { dispatch, rejectWithValue }) => movies
    .get(id).catch((err) => {
      dispatch(setError(err));
      return rejectWithValue(err);
    })
);

export const fetchReviews = createAsyncThunk<TReviewsListResponse, number, TConfig>(
  'movie/reviews',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const { page } = getState().movie.reviews;
    try {
      return movies.reviews(id, page);
    } catch (err) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  },
  {
    condition: (id, { getState }) => {
      const { hasMore } = getState().movie.reviews;
      return hasMore;
    }
  }
);

export const fetchSimilar = createAsyncThunk<TMovieData[], number, TConfig>(
  'movie/fetchSimilar',
  async (id) => {
    return movies.similar(id);
  }
);

export const addLike = createAsyncThunk<TLikeAddResponse | undefined, number, TConfig>(
  'movie/like/add',
  async (reviewId, { getState, dispatch, rejectWithValue }) => {
    const { user } = getState().user;
    if (!user) {
      return;
    }

    try {
      const result = await review.like.add(reviewId);
      return result;
    } catch (err: any) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

type TMovieState = {
  isLoading: boolean;
  data: TMovieDataFull | undefined;
};

type TSimilarState = {
  isLoading: boolean;
  items: TMovieData[];
};

type TReviewsState = {
  isLoading: boolean;
  items: TReview[];
  page: number;
  hasMore: boolean;
  loaded: boolean;
};

export type TMovieStateOuter = {
  movie: TMovieState;
  similar: TSimilarState;
  reviews: TReviewsState;
};

const initialState: TMovieStateOuter = {
  movie: {
    data: undefined,
    isLoading: false,
  },
  similar: {
    items: [],
    isLoading: false,
  },
  reviews: {
    items: [],
    page: 1,
    hasMore: true,
    isLoading: false,
    loaded: false
  }
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    reset: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.movie.isLoading = false;
      state.movie.data = action.payload;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.movie.isLoading = false;
      state.movie.data = undefined;
    });
    builder.addCase(fetchMovie.pending, (state, action) => {
      state.movie.isLoading = true;
    });

    builder.addCase(fetchSimilar.fulfilled, (state, action) => {
      state.similar.isLoading = false;
      state.similar.items = action.payload;
    });
    builder.addCase(fetchSimilar.rejected, (state, action) => {
      state.similar.isLoading = false;
      state.similar.items = [];
    });
    builder.addCase(fetchSimilar.pending, (state, action) => {
      state.similar.isLoading = true;
    });

    builder.addCase(fetchReviews.fulfilled, ({ reviews }, action) => {
      const { results, page, totalPages } = action.payload;

      reviews.isLoading = false;
      reviews.items = [...reviews.items, ...results];

      if (reviews.page < totalPages) {
        reviews.page++;
      }

      reviews.hasMore = totalPages !== page;
      reviews.loaded = true;
    });
    builder.addCase(fetchReviews.rejected, ({ reviews }, action) => {
      reviews.isLoading = false;
      reviews.items = [];
      reviews.page = 1;
    });
    builder.addCase(fetchReviews.pending, ({ reviews }, action) => {
      reviews.isLoading = true;
    });

    //like
    builder.addCase(addLike.fulfilled, ({ reviews }, action) => {
      const id = action.meta.arg
      const review = reviews.items.find((review) => review.id === id);
      if (review) {
        review.liked = !review.liked;
        review.likesCount = review.liked ? review.likesCount + 1 : review.likesCount - 1;
      }
    });
  }
});

const { reset } = movieSlice.actions;

export { reset };

export default movieSlice.reducer;
