import { createSlice } from "@reduxjs/toolkit";

export interface ChooseDates {
  startDate: string;
  endDate: string;
  roomId: string;
}

const initialState = {
  startDate: "",
  endDate: "",
  roomId: "",
} as ChooseDates;

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setRoom: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { setStartDate, setEndDate, setRoom } = dateSlice.actions;
export default dateSlice.reducer;
