import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest, SetAuth } from "../../scripts/Auth/SetAuth";

export const Auth = createAsyncThunk(
  "api/auth",
  async (authData: authRequest) => {
    const response = await SetAuth(authData);
    return response.json();
  }
);
