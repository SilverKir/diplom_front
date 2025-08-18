import { createSlice } from "@reduxjs/toolkit";

export interface TempData {
  tempData: string;
}

const initialState = {
  tempData: "",
} as TempData;

export const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    SetTempData: (state, action) => {
      state.tempData = action.payload;
    },
  },
});

export const { SetTempData } = tempSlice.actions;
export default tempSlice.reducer;
