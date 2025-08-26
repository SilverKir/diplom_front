import { useState, Dispatch, SetStateAction } from "react";
import { InputField } from "../Custom/InputField";
import { IHotel } from "../../interfaces";
import * as yup from "yup";
import { NAME_REQUIRED, DATA_NOT_CHANGED } from "../../constants";
import { CustomButton } from "../Custom/CustomButton";
import { useNavigate } from "react-router-dom";
import classes from "./HotelForm.module.css";

type HotelFormProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: IHotel;
  setForm: Dispatch<SetStateAction<IHotel>>;
  isLoading?: boolean;
  onCancel?: () => void;
};

export const HotelForm = (props: HotelFormProps) => {
  const [hasError, setError] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const nameSchema = yup.string().required(NAME_REQUIRED);
  const isUpdate = props.form.id ? true : false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (name === "title") {
      try {
        nameSchema.validateSync(value);
        setError("");
        setChecked(true);
      } catch (err) {
        setError(err.errors);
        setChecked(false);
      }
    } else if (isUpdate && name === "description") {
      setChecked(true);
    }
  };

  const handleNullLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdate) {
      setError(NAME_REQUIRED);
    } else {
      setError(DATA_NOT_CHANGED);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(e);
    handleCancel();
  };

  const handleCancel = () => {
    if (!isUpdate) {
      navigate("/");
    } else if (props.onCancel) {
      props.onCancel();
    }
  };

  return (
    <>
      <form
        className={classes["hotel-form"]}
        autoComplete="on"
        onSubmit={isChecked ? handleSubmit : handleNullLogin}
        onReset={handleCancel}
      >
        <h2>
          {props.form.id
            ? "Редактирование гостиницы"
            : "Создать новую гостиницу"}
        </h2>
        <div className={classes["form-wrap"]}>
          <InputField
            className={classes["hotel-title"]}
            type="text"
            name="title"
            value={props.form.title}
            placeholder="Введите название гостиницы (обязательно)"
            onChange={handleChange}
            isError={hasError}
            isChecked={isChecked}
          />

          <InputField
            className={classes["form-data"]}
            type="text"
            name="description"
            value={props.form.description}
            placeholder="Описание"
            onChange={handleChange}
          />
        </div>
        <div className={classes["buttons-wrap"]}>
          <CustomButton
            className={classes["form-data"]}
            type="submit"
            text={props.form.id ? "Изменить" : "Создать"}
            isLoading={props.isLoading}
          />

          <CustomButton
            className={classes["cancel-button"]}
            type="reset"
            text="Отмена"
          />
        </div>
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
