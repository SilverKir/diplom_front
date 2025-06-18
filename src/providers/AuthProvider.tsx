import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const handleAuth = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{ isAuth, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
