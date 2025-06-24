import { useState } from "react";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  const handleAuth = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    setIsAuth(false);
  };

  return { isAuth, handleAuth, handleLogout };
};
