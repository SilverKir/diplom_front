import { createSlice } from "@reduxjs/toolkit";

import { ILoginAction } from "../../interfaces";
import { NavThunk } from "../thunks/NavThunk";

export interface NavState {
  actions: {
    isAuth: boolean;
    nav: ILoginAction[];
  };
}

const initialState = {
  actions: { isAuth: false, nav: [] },
} as NavState;

export const navSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(NavThunk.fulfilled, (state, action) => {
      state.actions = action.payload;
    });
  },
});

export default navSlice.reducer;
