import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import tokenReducer from "../slices/tokenSlice";
import navReducer from "../slices/navSlice";

export const store = configureStore({
  reducer: {
    loginActions: loginReducer,
    authToken: tokenReducer,
    navActions: navReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
