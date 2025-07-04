import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetNav } from "../../scripts";

export const NavThunk = createAsyncThunk("api/nav", async () => {
  const response = await GetNav();
  return response;
});
