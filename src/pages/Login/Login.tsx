import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../redux/slices/loginSlice";
import classes from "./login.module.css";
import { useCookie } from "../../hooks";

export const Login = (props: { isLogin: boolean }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const [cookies, setCookies] = useState([]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const fromPage = location.state?.from;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form.email);
    console.log(form.password);
    try {
      const response = await fetch("http://localhost:3031/api/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const setCookieHeaders = response.headers.getSetCookie();
      setCookies(setCookieHeaders as unknown as []);
      const data = await response.json();
      console.log("Resp:", cookies);

      console.log("Success:", data);
      const cookieValue = document.cookie.split("; ");
      // .find((row) => row.startsWith("id="))
      // ?.split("=")[1];

      console.log("cookie :", cookieValue);

      //   handleAuth();
      //   dispatch(logout());
      //   navigate(`${fromPage ? fromPage : "/"}`);
    } catch (error) {
      console.error("Error:", error);
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
        onSubmit={handleLogin}
      >
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

      <div>
        <h1>Set-Cookie Headers</h1>
        <ul>
          {cookies.map((cookie, index) => (
            <li key={index}>{cookie}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
