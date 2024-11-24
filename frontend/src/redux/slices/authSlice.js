import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    AUTH_REQUEST: (state) => {
      state.loading = true;
      state.error = null;
    },
    AUTH_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    AUTH_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAIL } = authSlice.actions;
export default authSlice.reducer;
