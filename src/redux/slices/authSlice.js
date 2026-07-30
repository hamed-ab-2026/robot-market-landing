import { createSlice } from "@reduxjs/toolkit";

/**
 * Auth slice — placeholder state shape until the real login API
 * is connected. The dashboard nav link and any protected routes
 * will read from `isAuthenticated`.
 */
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = "idle";
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
