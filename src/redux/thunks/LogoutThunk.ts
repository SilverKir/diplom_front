import { createAsyncThunk } from "@reduxjs/toolkit";
import { SetLogout } from "../../scripts";
import { GetDataFromApiThunk } from "./GetDataFromApiThunk";

export const LogoutThunk = createAsyncThunk(
  "api/logout",
  async (_, { dispatch }) => {
    const apiAction = await dispatch(GetDataFromApiThunk(SetLogout()));
    return apiAction.payload;
  }
);
