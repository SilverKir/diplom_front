import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError } from "../../scripts";
import { RegisterForm } from "../../components";

import { Auth } from "../../redux/thunks/AuthThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";

export interface authResponse {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
  token: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const { loading, error } = useAppSelector((state) => state.authActions);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(Auth(form))
      .unwrap()
      .then(() => {
        handleAuth();
        dispatch(NavThunk());
        navigate(`/`);
      });
  };

  return (
    <>
      <RegisterForm
        form={form}
        setForm={setForm}
        onSubmit={HandleLogin}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
    </>
  );
};
