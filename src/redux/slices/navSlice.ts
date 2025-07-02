import { createSlice } from "@reduxjs/toolkit";

import { ILoginAction } from "../../interfaces";
import { GetNav } from "../../scripts";

export interface NavState {
  navActions: ILoginAction[];
}

const initialState = {
  navActions: await GetNav(),
} as NavState;

export const navSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    getNav: (state, action) => {
      state.navActions = action.payload;
    },
  },
});

export const { getNav } = navSlice.actions;
export default navSlice.reducer;
