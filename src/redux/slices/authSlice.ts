import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "../thunks/AuthThunk";
import { LogoutThunk } from "../thunks/LogoutThunk";

export interface AuthState {
  authToken: string | null;
  name: string;
}

const initialState = {
  authToken: localStorage.getItem("token") || null,
  name: "",
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
        state.name = action.payload.name;
      })
      .addCase(LogoutThunk.fulfilled, (state) => {
        state.authToken = "";
        localStorage.removeItem("token");
        state.name = "";
      });
  },
});

export default authSlice.reducer;
