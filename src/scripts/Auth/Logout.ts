import { useCallback, useContext } from "react";
import { GetDataFromAPI } from "../index";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../redux/slices/loginSlice";
import { setToken } from "../../redux/slices/tokenSlice";

export const Logout = () => {
  const { authToken } = useAppSelector((state) => state.authToken);
  const dispatch = useAppDispatch();
  const { handleLogout } = useContext(AuthContext);
  useCallback(async () => {
    try {
      const response = await GetDataFromAPI({
        url: "/auth/logout",
        method: "POST",
        token: authToken,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      handleLogout();
      dispatch(login());
      dispatch(setToken(""));
    } catch (e) {
      console.log(e);
    }
  }, []);
};
