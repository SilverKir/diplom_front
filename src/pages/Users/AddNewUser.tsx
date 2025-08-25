import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AddUser, GetError } from "../../scripts";
import { RegisterForm } from "../../components";
import { GetDataFromApiThunk } from "../../redux";



export const AddNewUser = () => {
  const { loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    contactPhone: "",
    role:"client",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const HandleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     await dispatch(GetDataFromApiThunk(AddUser(form)))
      .unwrap()
      .then(() => {
        navigate(`/admin/users`);
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
