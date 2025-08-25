import { useState, Dispatch, SetStateAction } from "react";
import { InputField } from "../Custom/InputField";
import classes from "./findHotelForm.module.css";
import {  IHotel } from "../../interfaces";
import * as yup from "yup";
import {
 NAME_REQUIRED
} from "../../constants";
import { CustomButton } from "../Custom/CustomButton";
import { useNavigate } from "react-router-dom";

type HotelFormProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: IHotel;
  setForm: Dispatch<SetStateAction<IHotel>>;
  isLoading?: boolean;
};

export const HotelForm = (props: HotelFormProps) => {
  const [hasError, setError] = useState<string>("");
  const [isChecked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    const nameSchema = yup
        .string()
        .required(NAME_REQUIRED);

    if (name === "title") {
      try {
        nameSchema.validateSync(value);
         setError("");
          setChecked(true);
        } catch (err) {
        setError(err.errors)
        setChecked(false);
      }
        
    }
  };

  const handleNullLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   props.onSubmit();

  };

  const handleCancel=()=>{
    navigate("/admin/hotel")
  }


  return (
    <>
      <form
        className={classes["hotel-form"]}
        autoComplete="on"
        onSubmit={
          isChecked  ? handleSubmit : handleNullLogin
        }
        onReset={handleCancel}
      >
        <h2>{props.form.id?"Редактирование гостиницы":"Создать новую гостиницу"}</h2>
        <div className={classes["form-wrap"]}>
          <InputField
            className={classes["hotel-title"]}
            type="text"
            name="title"
            value={props.form.title}
            placeholder="Введите название гостиницы (необязательно)"
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
        <CustomButton
          className={classes["form-data"]}
          type="submit"
          text = {props.form.id?"Изменить":"Создать"}
          isLoading={props.isLoading}
        />

         <CustomButton
          className={classes["form-data"]}
          type="reset"
          text = "Отмена"
          // onClick={props.onCancel}
        />
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
