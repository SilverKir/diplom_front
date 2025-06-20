import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../redux/slices/loginSlice";
import { setToken } from "../../redux/slices/tokenSlice";
import classes from "./login.module.css";
import { useAppSelector } from "../../hooks";
import { SetAuth } from "../../scripts";

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
  const [hasError, setError] = useState<Error | null>(null);

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      dispatch(setToken(data.token));
      handleAuth();
      // dispatch(logout());
      // navigate(`${fromPage ? fromPage : "/"}`);
    } catch (e) {
      setError(e as Error);
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        className={classes["login-form"]}
        autoComplete="off"
        onSubmit={HandleLogin}
      >
        <h2 className={classes["form-error"]}>{hasError?.message}</h2>
        <input
          className={classes["form-data"]}
          type="email"
          id="email"
          name="email"
          value={form.email}
          placeholder="Введите логин"
          onChange={handleChange}
        />
        <input
          className={classes["form-data"]}
          type="password"
          id="password"
          name="password"
          value={form.password}
          placeholder="Введите пароль"
          onChange={handleChange}
        />
        <button className={classes["form-button"]} type="submit">
          {props.isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
    </>
  );
};
