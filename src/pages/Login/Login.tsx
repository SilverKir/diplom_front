import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../redux/slices/loginSlice";
import classes from "./login.module.css";
import { SetAuth } from "../../scripts";
import { setToken } from "../../redux/slices/tokenSlice";
import { InputField } from "../../components/Custom/InputField";

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
        throw new Error(`${response.status}`);
      }
      const data = await response.json();

      handleAuth();
      dispatch(logout());
      dispatch(setToken(data.token));
      navigate(`${fromPage ? fromPage : "/"}`);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (!emailRegex.test(form.email)) {
      setError("Необ");
    } else {
      setError("");
    }
  };

  return (
    <>
      <form
        className={classes["login-form"]}
        autoComplete="off"
        onSubmit={HandleLogin}
      >
        <InputField
          className={classes["form-data"]}
          type="email"
          id="email"
          name="email"
          value={form.email}
          placeholder="Введите логин"
          onChange={handleChange}
          isError={hasError}
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
