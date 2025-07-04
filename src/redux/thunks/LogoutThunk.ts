import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetLogout } from "../../scripts";

export const LogoutThunk = createAsyncThunk("api/logout", async () => {
  return await SetLogout();
});
