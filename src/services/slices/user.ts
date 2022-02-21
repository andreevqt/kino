import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user, TUser, TTokens } from '../api';
import { RootState, AppDispatch } from '../store';
import Cookie from 'js-cookie';

type TUserState = {
  user: {
    name: string;
    email: string;
  } | undefined,
  accessToken: string | undefined;
  error: string | undefined;
  isLoading: boolean;
};

type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

const initialState: TUserState = {
  user: undefined,
  accessToken: undefined,
  error: undefined,
  isLoading: false
};

export const login = createAsyncThunk<TUser & { tokens: TTokens }, { email: string, password: string }, TConfig>(
  'user/login',
  async (args) => {
    const response = await user.login(args.email, args.password);
    Cookie.set('refreshToken', response.tokens.refresh);
    return response;
  }
);

export const logout = createAsyncThunk<void, () => void, TConfig>(
  'user/logout',
  async (cb) => {
    const token = Cookie.get('refreshToken');
    if (token) {
      user.logout(token);
    }
    cb();
  }
);

export const refresh = createAsyncThunk<TTokens | undefined, undefined, TConfig>(
  'user/refresh',
  async () => {
    const token = Cookie.get('refreshToken');
    if (token) {
      const tokens = await user.refresh(token);
      Cookie.set('refreshToken', tokens.refresh);
      return tokens;
    }
  }
);

export const getUser = createAsyncThunk<TUser | undefined, undefined, TConfig>(
  'user/get',
  async (arg, { getState }) => {
    const { accessToken } = getState().user;
    if (accessToken) {
      return user.get();
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = { name: user.name, email: user.email }
      state.accessToken = user.tokens.access;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
      state.error = action.error.message;
    });

    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = undefined;
    });

    // refresh
    builder.addCase(refresh.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      const tokens = action.payload;
      state.isLoading = false;
      state.accessToken = tokens?.access;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // get user
    builder.addCase(getUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export default userSlice.reducer;
