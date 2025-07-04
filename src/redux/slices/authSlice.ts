import { createSlice } from "@reduxjs/toolkit";
import { ILoginAction } from "../../interfaces";
import { GetNav } from "../../scripts";
import { Auth } from "../thunks/AuthThunk";
import { NavThunk } from "../thunks/NavThunk";

export interface AuthState {
  actions: { isAuth: boolean; nav: ILoginAction[] };
  authToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  actions: await GetNav(),
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
        console.log(action.error);
      });
  },
});

export default authSlice.reducer;
