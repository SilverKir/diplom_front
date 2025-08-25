import { Dispatch, SetStateAction } from "react";
import { InputField } from "../Custom/InputField";
import classes from "./FindUserForm.module.css";
import { IFindUser } from "../../interfaces";
import { CustomButton } from "../Custom/CustomButton";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";

type FindUserProps = {
  className?: string;
  isError?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  form: IFindUser;
  setForm: Dispatch<SetStateAction<IFindUser>>;
  isLoading?: boolean;
};

export const FindUserForm = (props: FindUserProps) => {
  const { actions } = useAppSelector((state) => state.navActions);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    props.setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const AddNewUser = () => {
     navigate(`/admin/new_user/`);
  };

  return (
    <>
      <form
        className={classes["login-form"]}
        autoComplete="on"
        onSubmit={props.onSubmit}
      >
        <InputField
          className={classes["form-data"]}
          type="text"
          name="email"
          value={props.form.email}
          placeholder="e-mail"
          onChange={handleChange}
        />
        <InputField
          className={classes["form-data"]}
          type="text"
          name="name"
          value={props.form.name}
          placeholder="Имя"
          onChange={handleChange}
        />

        <InputField
          className={classes["form-data"]}
          type="text"
          name="contactPhone"
          value={props.form.contactPhone}
          placeholder="Контактный телефон"
          onChange={handleChange}
        />
        <div className={classes["buttons-wrap"]}>
          <CustomButton
            className={classes["form-data"]}
            type="submit"
            text="Найти"
            isLoading={props.isLoading}
          />
          {actions.role === "admin" && (
            <CustomButton
              className={classes["form-data"]}
              type="button"
              text="Добавить"
              onClick={AddNewUser}
            />
          )}
        </div>
        <div className={classes["error-message"]}>
          {props.isError ? props.isError : ""}
        </div>
      </form>
    </>
  );
};
