import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest, SetAuth } from "../../scripts/Auth/SetAuth";
import { GetDataFromApiThunk } from "./GetDataFromApiThunk";

export const Auth = createAsyncThunk(
  "api/auth",
  async (authData: authRequest, { dispatch }) => {
    const apiAction = await dispatch(GetDataFromApiThunk(SetAuth(authData)));
    return apiAction.payload;
  }
);
