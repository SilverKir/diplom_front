import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginAction } from "../../interfaces";
import { GetNav } from "../../scripts";

export interface IAuthNav {
  isAuth: boolean;
  nav: ILoginAction[];
}
export const NavThunk = createAsyncThunk("api/nav", async () => {
  const response = await GetNav();
  return (await response.json()) as IAuthNav;
});
