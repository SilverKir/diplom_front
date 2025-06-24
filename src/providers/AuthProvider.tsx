import { FC, PropsWithChildren} from "react";
import { AuthContext } from "../context/AuthContext";


import { useAuth } from "../hooks";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isAuth, handleAuth, handleLogout } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuth, handleAuth, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
