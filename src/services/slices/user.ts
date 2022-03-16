import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { user, TUser, TTokens } from '../api';
import { RootState, AppDispatch } from '../store';
import Cookie from 'js-cookie';
import { setError } from './common';

type TUserState = {
  user: {
    name: string;
    email: string;
  } | undefined,
  accessToken: string | undefined;
  isLoading: boolean;
};

type TConfig = {
  state: RootState;
  dispatch: AppDispatch;
};

type TLogin = TUser & { tokens: TTokens };
type TLoginArgs = { email: string, password: string };

type TRegister = TLogin;
type TRegisterArgs = TLoginArgs & { name: string };

const initialState: TUserState = {
  user: undefined,
  accessToken: undefined,
  isLoading: false
};

export const login = createAsyncThunk<TLogin, TLoginArgs, TConfig>(
  'user/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await user.login(email, password);
      Cookie.set('refreshToken', response.tokens.refresh);
      return response;
    } catch (err: any) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk<TRegister, TRegisterArgs, TConfig>(
  'user/register',
  async ({ email, password, name }, { dispatch, rejectWithValue }) => {
    try {
      const response = await user.create(email, password, name);
      Cookie.set('refreshToken', response.tokens.refresh);
      return response;
    } catch (err: any) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk<void, () => void, TConfig>(
  'user/logout',
  async (cb, { dispatch, rejectWithValue }) => {
    try {
      const token = Cookie.get('refreshToken');
      if (token) {
        await user.logout(token);
      }
      Cookie.set('refreshToken', '');
      cb();
    } catch (err: any) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const refresh = createAsyncThunk<TTokens | undefined, undefined, TConfig>(
  'user/refresh',
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const token = Cookie.get('refreshToken');
      if (token) {
        const tokens = await user.refresh(token);
        Cookie.set('refreshToken', tokens.refresh);
        return tokens;
      }
    } catch (err: any) {
      dispatch(setError(err));
      return rejectWithValue(err);
    }
  }
);

export const getUser = createAsyncThunk<TUser | undefined, undefined, TConfig>(
  'user/get',
  async (arg, { getState, rejectWithValue, dispatch }) => user
    .get()
    .catch((err: any) => {
      if (typeof err === 'string') {
        return;
      }
      dispatch(setError(err));
      return rejectWithValue(err);
    })
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
    });

    // register
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const user = action.payload;
      state.isLoading = false;
      state.user = { name: user.name, email: user.email }
      state.accessToken = user.tokens.access;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.user = undefined;
      state.isLoading = false;
    });

    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
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
    });
  }
});

export default userSlice.reducer;
