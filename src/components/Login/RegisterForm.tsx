import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../Custom/InputField";
import classes from "./registerForm.module.css";
import { IRegisterData } from "../../interfaces";
import * as yup from "yup";
import {
  MIN_SYMBOLS_IN_PASSWORD,
  WRONG_EMAIL_FORMAT,
  REQUIRED_EMAIL,
  NAME_REQUIRED,
} from "../../constants";
import { CustomButton } from "../Custom/CustomButton";

type RegisterFormProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: IRegisterData;
  setForm: Dispatch<SetStateAction<IRegisterData>>;
  isLoading?: boolean;
};

export const RegisterForm = (props: RegisterFormProps) => {
  const [hasError, setError] = useState<string[]>([]);
  const [isChecked, setChecked] = useState<boolean[]>([false, false, false]);
  const emailSchema = yup
    .string()
    .email(WRONG_EMAIL_FORMAT)
    .required(REQUIRED_EMAIL);
  const passwordSchema = yup.string().min(6, MIN_SYMBOLS_IN_PASSWORD + 6);
  const nameSchema = yup.string().required(NAME_REQUIRED);

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
        Errors[0] = err.errors;
        Checked[0] = false;
      }
    } else if (name === "password") {
      try {
        passwordSchema.validateSync(value);
        Errors[1] = "";
        Checked[1] = true;
      } catch (err) {
        Errors[1] = err.errors;
        Checked[1] = false;
      }
    } else if (name === "name") {
      try {
        nameSchema.validateSync(value);
        Errors[2] = "";
        Checked[2] = true;
      } catch (err) {
        Errors[2] = err.errors;
        Checked[2] = false;
      }
    }

    setError(Errors);
    setChecked(Checked);
  };

  const handleNullLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let emailError = "";
    let passwordError = "";
    let nameError = "";
    if (isChecked[0] == false) {
      emailError = REQUIRED_EMAIL;
    }
    if (isChecked[1] == false) {
      passwordError = MIN_SYMBOLS_IN_PASSWORD + 6;
    }
    if (isChecked[2] == false) {
      nameError = NAME_REQUIRED;
    }
    setError([emailError, passwordError, nameError]);
  };

  return (
    <>
      <form
        className={classes["register-form"]}
        autoComplete="on"
        onSubmit={
          isChecked[0] && isChecked[1] && isChecked[2]
            ? props.onSubmit
            : handleNullLogin
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
        <InputField
          className={classes["form-data"]}
          type="text"
          name="name"
          value={props.form.name}
          placeholder="Введите имя"
          onChange={handleChange}
          isError={hasError[2]}
          isChecked={isChecked[2]}
        />
        <InputField
          className={classes["form-data"]}
          type="text"
          name="contactPhone"
          value={props.form.contactPhone}
          placeholder="Введите телефон"
          onChange={handleChange}
        />

        <CustomButton
          className={classes["form-data"]}
          type="submit"
          text="Зарегистрироваться"
          isLoading={props.isLoading}
        />
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
