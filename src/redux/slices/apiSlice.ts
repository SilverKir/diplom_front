import { createSlice } from "@reduxjs/toolkit";
import { GetDataFromApiThunk } from "../";

export interface ApiState {
  data: object | object[] | null;
  loading: boolean;
  error: string | undefined | null;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
} as ApiState;

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDataFromApiThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetDataFromApiThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(GetDataFromApiThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
