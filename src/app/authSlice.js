import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    info: null,
    status: {
      isFetching: false,
      error: false,
    },
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user.status.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.user.status.isFetching = false;
      state.user.info = action.payload;
    },
    loginFailure: (state) => {
      state.user.status.isFetching = false;
      state.user.status.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
