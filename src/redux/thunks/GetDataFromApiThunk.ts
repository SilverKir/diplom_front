import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRequestData } from "../../interfaces";
import { GetDataFromAPI } from "../../scripts";

export const GetDataFromApiThunk = createAsyncThunk(
  "api/getData",
  async (fetchParam: IRequestData) => {
    const response = await GetDataFromAPI(fetchParam);
    return response.json();
  }
);
