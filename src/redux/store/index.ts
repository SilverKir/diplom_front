import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";

export const store = configureStore({
  reducer: {
    loginActions: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
