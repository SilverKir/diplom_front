import { useState, Dispatch, SetStateAction } from "react";
import { InputField } from "../Custom/InputField";
import classes from "./findHotelForm.module.css";
import { IFindHotelData } from "../../interfaces";
import * as yup from "yup";
import { DATE_REQUIRED } from "../../constants";
import { CustomButton } from "../Custom/CustomButton";

type FindHotelFormProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: IFindHotelData;
  setForm: Dispatch<SetStateAction<IFindHotelData>>;
  isLoading?: boolean;
};

export const FindHotelForm = (props: FindHotelFormProps) => {
  const [hasError, setError] = useState<string[]>([]);
  const [isChecked, setChecked] = useState<boolean[]>([false, false]);
  const dateSchema = yup.date();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    const Errors = [...hasError];
    const Checked = [...isChecked];

    if (name === "dateStart") {
      try {
        dateSchema.validateSync(value);
        Errors[0] = "";
        Checked[0] = true;
      } catch (err) {
        Errors[0] = err.errors;
        Checked[0] = false;
      }
    } else if (name === "dateEnd") {
      try {
        dateSchema.validateSync(value);
        Errors[1] = "";
        Checked[1] = true;
      } catch (err) {
        Errors[1] = err.errors;
        Checked[1] = false;
      }
    }
    setError(Errors);
    setChecked(Checked);
  };

  const handleNullLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let dateStartError = "";
    let dateEndError = "";
    if (isChecked[0] == false) {
      dateStartError = DATE_REQUIRED;
    }
    if (isChecked[1] == false) {
      dateEndError = DATE_REQUIRED;
    }
    setError([dateStartError, dateEndError]);
  };

  return (
    <>
      <form
        className={classes["find-hotel-form"]}
        autoComplete="on"
        onSubmit={
          isChecked[0] && isChecked[1] ? props.onSubmit : handleNullLogin
        }
      >
        <h2>Поиск гостиницы</h2>
        <div className={classes["form-wrap"]}>
          <InputField
            className={classes["hotel-title"]}
            type="text"
            name="hotelTitle"
            value={props.form.hotelTitle}
            placeholder="Введите название гостиницы (необязательно)"
            onChange={handleChange}
          />
          <div className={classes["date-wrap"]}>
            <InputField
              className={classes["form-data"]}
              type="date"
              name="dateStart"
              value={props.form.dateStart}
              placeholder="Заезд"
              onChange={handleChange}
              isError={hasError[0]}
              isChecked={isChecked[0]}
            />
            -
            <InputField
              className={classes["form-data"]}
              type="date"
              name="dateEnd"
              value={props.form.dateEnd}
              placeholder="Выезд"
              onChange={handleChange}
              isError={hasError[1]}
              isChecked={isChecked[1]}
            />
          </div>
        </div>
        <CustomButton
          className={classes["form-data"]}
          type="submit"
          text="Искать"
          isLoading={props.isLoading}
        />
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
