import { useContext, useEffect } from "react";

import { useAppDispatch } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { LogoutThunk } from "../../redux/thunks/LogoutThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";
import { SetLogout } from "./SetLogout";

export const Logout = () => {
  const dispatch = useAppDispatch();
  // const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      await SetLogout();
      localStorage.setItem("token", "");

      // dispatch(LogoutThunk());
      // handleLogout();
      await dispatch(NavThunk());
    };
    fetchData();
  }, []);
};
