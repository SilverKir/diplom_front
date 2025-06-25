import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../redux/slices/loginSlice";
import classes from "./login.module.css";
import { GetError, SetAuth } from "../../scripts";
import { setToken } from "../../redux/slices/tokenSlice";
import { LoginForm } from "../../components/Custom/LoginForm";

export interface authResponse {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
  token: string;
}

export const Login = (props: { isLogin: boolean }) => {
  const { authToken } = useAppSelector((state) => state.authToken);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const [hasError, setError] = useState<string>("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const fromPage = location.state?.from;

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await SetAuth(form, authToken);
      if (!response.ok) {
        throw new Error(GetError(response.status));
      }
      setError("");
      const data = await response.json();
      handleAuth();
      dispatch(logout());
      dispatch(setToken(data.token));
      navigate(`${fromPage ? fromPage : "/"}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <LoginForm
        isLogin={props.isLogin}
        form={form}
        setForm={setForm}
        onSubmit={HandleLogin}
        isError={hasError}
      />
    </>
  );
};
