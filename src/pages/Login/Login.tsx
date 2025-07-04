import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../redux/slices/loginSlice";
import { GetError, GetNav, SetAuth } from "../../scripts";
import { setToken } from "../../redux/slices/tokenSlice";
import { LoginForm } from "../../components/Custom/LoginForm";
import { getNav } from "../../redux";
import { Auth } from "../../redux/thunks/AuthThunk";

export interface authResponse {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
  token: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const [hasError, setError] = useState<string>("");
  const { loading, error } = useAppSelector((state) => state.authActions);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const fromPage = location.state?.from;

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(Auth(form));

    // try {
    //   setLoading(true);
    //   const response = await SetAuth(form);
    //   if (!response.ok) {
    //     if (response.status === 403) {
    //       dispatch(logout());
    //     }
    //     throw new Error(GetError(response.status));
    //   }
    //   setError("");
    //   const data = await response.json();
    //   handleAuth();
    //   localStorage.setItem("token", data.token);
    //   dispatch(logout());
    //   dispatch(setToken(data.token));
    //   dispatch(getNav(await GetNav()));
    //   setLoading(false);
    // navigate(`${fromPage ? fromPage : "/"}`);
    // } catch (e) {
    //   setError(e.message);
    //   setLoading(false);
    // }
  };

  return (
    <>
      <LoginForm
        form={form}
        setForm={setForm}
        onSubmit={HandleLogin}
        isError={error ? error : undefined}
        isLoading={loading}
      />
    </>
  );
};
