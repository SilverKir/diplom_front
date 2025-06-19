import { createSlice } from "@reduxjs/toolkit";

import { ILoginAction } from "../../interfaces";
import { loginLinks, logoutLinks } from "../../constants/login";

export interface LoginState {
  loginActions: ILoginAction[];
}

const initialState = {
  loginActions: loginLinks,
} as LoginState;

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.loginActions = loginLinks;
    },
    logout: (state) => {
      state.loginActions = logoutLinks;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
