import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import tokenReducer from "../slices/tokenSlice";

export const store = configureStore({
  reducer: {
    loginActions: loginReducer,
    authToken: tokenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
