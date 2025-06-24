import { createContext } from "react";

export interface IAuthContext {
  isAuth: boolean;
  handleAuth: () => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  handleAuth: () => {},
  handleLogout: () => {},
});
