import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle' 
  },
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
    },
    loginFailed: (state) => {
      state.status = 'failed';
    },
    logout: (state) => {
  state.user = null;
  state.status = 'idle';
}
  }
});

export const { loginStart, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;