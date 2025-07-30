import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../slices/navSlice";
import authReducer from "../slices/authSlice";
import apiReducer from "../slices/apiSlice";
import dateReducer from "../slices/dateSlice";

export const store = configureStore({
  reducer: {
    navActions: navReducer,
    authActions: authReducer,
    apiAction: apiReducer,
    dateAction: dateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
