import { createContext } from "react";

export interface IAuthContext {
  isAuth: boolean;
  handleAuth: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  handleAuth: () => {},
});
