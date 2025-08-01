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
  reducers: {
    SetNullData: (state) => {
      state.data = null;
    },
    SetError: (state, action) => {
      state.error = action.payload;
    },
    SetLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
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

export const { SetError, SetLoading, SetNullData } = apiSlice.actions;
export default apiSlice.reducer;
