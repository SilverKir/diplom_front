import { createSlice } from "@reduxjs/toolkit";

import { ILoginAction } from "../../interfaces";
import { NavThunk } from "../thunks/NavThunk";

export interface NavState {
  actions: {
    isAuth: boolean;
    nav: ILoginAction[];
  };
  loading: boolean;
  error: string | undefined | null;
}

const initialState = {
  actions: { isAuth: false, nav: [] },
  loading: false,
  error: null,
} as NavState;

export const navSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {},
   extraReducers: (builder) => {
      builder
        .addCase(NavThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(NavThunk.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.actions = action.payload;
        })
        .addCase(NavThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
});

export default navSlice.reducer;
