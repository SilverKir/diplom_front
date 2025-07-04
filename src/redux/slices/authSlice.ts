import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../thunks/AuthThunk";
import { LogoutThunk } from "../thunks/LogoutThunk";

export interface AuthState {
  authToken: string | null;
  loading: boolean;
  error: string | undefined | null;
}

const initialState = {
  authToken: localStorage.getItem("token") || null,
  loading: false,
  error: null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Auth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Auth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.authToken = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(Auth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(LogoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.authToken = ""
        localStorage.removeItem("token");
      })
      .addCase(LogoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
