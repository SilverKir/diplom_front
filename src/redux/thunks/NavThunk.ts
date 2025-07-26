import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginAction } from "../../interfaces";
import { GetNav } from "../../scripts";
import { GetDataFromApiThunk } from "./GetDataFromApiThunk";

export interface IAuthNav {
  isAuth: boolean;
  role: string;
  nav: ILoginAction[];
}
export const NavThunk = createAsyncThunk("api/nav", async (_, { dispatch }) => {
  const apiAction = await dispatch(GetDataFromApiThunk(GetNav()));
  return apiAction.payload as IAuthNav;
});
