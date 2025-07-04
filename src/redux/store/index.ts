import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import tokenReducer from "../slices/tokenSlice";
import navReducer from "../slices/navSlice";
import authReducer from "../slices/authSlice";

export const store = configureStore({
  reducer: {
    loginActions: loginReducer,
    authToken: tokenReducer,
    navActions: navReducer,
    authActions: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
