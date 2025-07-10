import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../thunks/AuthThunk";
import { LogoutThunk } from "../thunks/LogoutThunk";

export interface AuthState {
  authToken: string | null;
}

const initialState = {
  authToken: localStorage.getItem("token") || null,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Auth.fulfilled, (state, action) => {
        state.authToken = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(LogoutThunk.fulfilled, (state) => {
        state.authToken = "";
        localStorage.removeItem("token");
      })
  },
});

export default authSlice.reducer;
