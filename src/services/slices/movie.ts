import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TMovieData, TMovieDataFull, movies } from '../api';
import { RootState, AppDispatch } from '../store';
import { transformMovie, transformMovies } from '../transforms';

type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

export const fetchMovie = createAsyncThunk<TMovieDataFull, number, TConfig>(
  'movie/get',
  async (id, thunkAPI) => {
    return transformMovie(await movies.get(id));
  }
);

export const fetchSimilar = createAsyncThunk<TMovieData[], number, TConfig>(
  'movie/fetchSimilar',
  async (id) => {
    const similar = await movies.similar(id);
    return transformMovies(similar.results);
  }
);

type TMovieState = {
  isLoading: boolean;
  data: TMovieDataFull | undefined;
  error: string | undefined;
};

type TSimilarState = {
  isLoading: boolean;
  items: TMovieData[];
  error: string | undefined;
};

export type TMovieStateOuter = {
  movie: TMovieState;
  similar: TSimilarState;
};

const initialState: TMovieStateOuter = {
  movie: {
    data: undefined,
    isLoading: false,
    error: undefined
  },
  similar: {
    items: [],
    isLoading: false,
    error: undefined
  }
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    onPageUnload: (state) => {
      state = initialState;
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
      state.movie.error = action.error.message;
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
      state.similar.error = action.error.message;
    });
    builder.addCase(fetchSimilar.pending, (state, action) => {
      state.similar.isLoading = true;
    });
  }
});

const { onPageUnload } = movieSlice.actions;

export { onPageUnload };

export default movieSlice.reducer;
