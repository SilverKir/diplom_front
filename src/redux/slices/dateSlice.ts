import { createSlice } from "@reduxjs/toolkit";

export interface ChooseDates {
  startDate: Date;
  endDate: Date;
  roomId: string;
}

const initialState = {
  startDate: new Date(0),
  endDate: new Date(8.64e15),
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
