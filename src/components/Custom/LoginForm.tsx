import { useState, Dispatch, SetStateAction } from "react";
import { InputField } from "./InputField";
import classes from "./loginForm.module.css";
import { ILoginData } from "../../interfaces";
import * as yup from "yup";
import {
  MIN_SYMBOLS_IN_PASSWORD,
  WRONG_EMAIL_FORMAT,
  REQUIRED_EMAIL,
} from "../../constants/";

type LoginFormProps = {
  className?: string;
  isLogin: boolean;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: ILoginData;
  setForm: Dispatch<SetStateAction<ILoginData>>;
};

export const LoginForm = (props: LoginFormProps) => {
  const [hasError, setError] = useState<string[]>([]);
  const [isChecked, setChecked] = useState<boolean[]>([false, false]);
  const emailSchema = yup
    .string()
    .email(WRONG_EMAIL_FORMAT)
    .required(REQUIRED_EMAIL);
  const passwordSchema = yup.string().min(6, MIN_SYMBOLS_IN_PASSWORD + 6);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (name === "email") {
      try {
        emailSchema.validateSync(value);
        setError(["", hasError[1]]);
        setChecked([true, isChecked[1]]);
      } catch (err) {
        setError([err.errors, hasError[1]]);
      }
    } else {
      try {
        passwordSchema.validateSync(value);
        setError([hasError[0], ""]);
        setChecked([isChecked[0], true]);
      } catch (err) {
        setError([hasError[0], err.errors]);
      }
    }
  };

  const handleNullLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";
    if (isChecked[0] == false) {
      emailError = REQUIRED_EMAIL;
    }
    if (isChecked[1] == false) {
      passwordError = MIN_SYMBOLS_IN_PASSWORD + 6;
    }
    setError([emailError, passwordError]);
  };

  return (
    <>
      <form
        className={classes["login-form"]}
        autoComplete="off"
        onSubmit={
          isChecked[0] && isChecked[1] ? props.onSubmit : handleNullLogin
        }
      >
        <InputField
          className={classes["form-data"]}
          type="email"
          name="email"
          value={props.form.email}
          placeholder="Введите логин"
          onChange={handleChange}
          isError={hasError[0]}
          isChecked={isChecked[0]}
        />
        <InputField
          className={classes["form-data"]}
          type="password"
          name="password"
          value={props.form.password}
          placeholder="Введите пароль"
          onChange={handleChange}
          isError={hasError[1]}
          isChecked={isChecked[1]}
        />
        <button className={classes["form-button"]} type="submit">
          {props.isLogin ? "Войти" : "Зарегистрироваться"}
        </button>
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
