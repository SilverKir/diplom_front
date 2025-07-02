import { createSlice } from "@reduxjs/toolkit";

export interface tokenState {
  authToken: string;
}

const initialState = {
  authToken: localStorage.getItem("token") || null,
} as tokenState;

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, actions) => {
      state.authToken = actions.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
