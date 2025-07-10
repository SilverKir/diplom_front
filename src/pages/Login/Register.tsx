import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError, SetRegister } from "../../scripts";
import { RegisterForm } from "../../components";

import { Auth } from "../../redux/thunks/AuthThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";
import { GetDataFromApiThunk } from "../../redux";

export interface regResponse {
  id: string;
  email: string;
  name: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const { loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    contactPhone: "",
  });

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(Auth({ email: form.email, password: form.password }))
      .unwrap()
      .then(() => {
        handleAuth();
        dispatch(NavThunk());
        navigate(`/`);
      });
  };

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(GetDataFromApiThunk(SetRegister(form)))
      .unwrap()
      .then(() => {
        HandleLogin(e);
      });
  };

  return (
    <>
      <RegisterForm
        form={form}
        setForm={setForm}
        onSubmit={HandleRegister}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
    </>
  );
};
