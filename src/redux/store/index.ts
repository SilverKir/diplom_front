import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/navSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    navActions: navReducer,
    authActions: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
