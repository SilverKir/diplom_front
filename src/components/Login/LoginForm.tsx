import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../Custom/InputField";
import classes from "./loginForm.module.css";
import { ILoginData } from "../../interfaces";
import * as yup from "yup";
import {
  MIN_SYMBOLS_IN_PASSWORD,
  WRONG_EMAIL_FORMAT,
  REQUIRED_EMAIL,
} from "../../constants";
import { CustomButton } from "../Custom/CustomButton";

type LoginFormProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: ILoginData;
  setForm: Dispatch<SetStateAction<ILoginData>>;
  isLoading?: boolean;
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

    const Errors = [...hasError];
    const Checked = [...isChecked];

    if (name === "email") {
      try {
        emailSchema.validateSync(value);
        Errors[0] = "";
        Checked[0] = true;
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          Errors[0] = err.errors[0];
          Checked[0] = false;
        }
      }
    } else {
      try {
        passwordSchema.validateSync(value);
        Errors[1] = "";
        Checked[1] = true;
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          Errors[1] = err.errors[0];
          Checked[1] = false;
        }
      }
    }
    setError(Errors);
    setChecked(Checked);
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
        autoComplete="on"
        onSubmit={
          isChecked[0] && isChecked[1] ? props.onSubmit : handleNullLogin
        }
      >
        <div className={classes["login-registration-selection"]}>
          <Link to="/login">Войти</Link>
          <div> или </div>
          <Link to="/register">Зарегистрироваться</Link>
        </div>

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

        <CustomButton
          className={classes["form-data"]}
          type="submit"
          text="Войти"
          isLoading={props.isLoading}
        />
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
