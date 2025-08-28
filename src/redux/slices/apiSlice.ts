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
        state.error = null;
        state.loading = true;
      })
      .addCase(GetDataFromApiThunk.fulfilled, (state, action) => {
        state.data = action.payload ? action.payload : null;
        state.error = null;
        state.loading = false;
      })
      .addCase(GetDataFromApiThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { SetError, SetLoading, SetNullData } = apiSlice.actions;
export default apiSlice.reducer;
