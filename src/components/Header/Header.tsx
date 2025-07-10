import { LoginSelect } from "../LoginNav/LoginSelect";
import { Logo } from "../Logo/Logo";
import classes from "./header.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginLinks, logoutLinks } from "../../constants/login";
import { NavThunk } from "../../redux/thunks/NavThunk";
import { useEffect } from "react";

export const Header = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(NavThunk());
  }, [dispatch]);

  const { actions } = useAppSelector((state) => state.navActions);

  return (
    <>
      <header className={classes["header"]}>
        <Logo />
        <LoginSelect actions={actions.isAuth ? logoutLinks : loginLinks} />
      </header>
    </>
  );
};
