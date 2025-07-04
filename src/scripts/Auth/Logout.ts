import { useContext } from "react";
import { GetDataFromAPI } from "../index";
import { useAppDispatch } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../redux/slices/loginSlice";
import { setToken } from "../../redux/slices/tokenSlice";

export const Logout = async () => {
  // const dispatch = useAppDispatch();
  // const { handleLogout } = useContext(AuthContext);

  try {
    const response = await GetDataFromAPI({
      url: "/auth/logout",
      method: "POST",
    });
    if (response.ok!) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // handleLogout();
    // dispatch(login());
    localStorage.removeItem("token");
    // dispatch(setToken(""));
  } catch (e) {
    console.log(e);
  }
};
