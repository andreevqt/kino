import { createSlice } from '@reduxjs/toolkit';

type TCommonState = {
  lastErr: string | undefined;
};

const initialState: TCommonState = {
  lastErr: undefined
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setError: (state, action) => {
      console.log(action);
      state.lastErr = action.payload;
    }
  }
});

const { setError } = commonSlice.actions;

export { setError };

export default commonSlice.reducer;
