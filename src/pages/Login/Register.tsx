import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError } from "../../scripts";
import { RegisterForm } from "../../components";

import { Auth } from "../../redux/thunks/AuthThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";

export interface regResponse {
  id: string;
  email: string;
  name: string;
}

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const { loading, error } = useAppSelector((state) => state.authActions);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    contactPhone: "",
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
        set
        Form={setForm}
        onSubmit={HandleLogin}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
    </>
  );
};
