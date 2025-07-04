import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError } from "../../scripts";
import { LoginForm } from "../../components/Custom/LoginForm";

import { Auth } from "../../redux/thunks/AuthThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";

export interface authResponse {
  id: string;
  email: string;
  name: string;
  contactPhone: string;
  token: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  const { loading, error } = useAppSelector((state) => state.authActions);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const fromPage = location.state?.from;

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(Auth(form));
    handleAuth();
    dispatch(NavThunk());
    console.log(error);
    if (error!) {
      console.log("kjhgjhgjh");
      navigate(`/`);
    }
  };

  return (
    <>
      <LoginForm
        form={form}
        setForm={setForm}
        onSubmit={HandleLogin}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
    </>
  );
};
