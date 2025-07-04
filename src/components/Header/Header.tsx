import { LoginSelect } from "../LoginNav/LoginSelect";
import { Logo } from "../Logo/Logo";
import classes from "./header.module.css";
import { useAppSelector } from "../../hooks";
import { loginLinks, logoutLinks } from "../../constants/login";

export const Header = () => {
  const { actions } = useAppSelector((state) => state.authActions);

  return (
    <>
      <header className={classes["header"]}>
        <Logo />
        <LoginSelect actions={actions.isAuth ? logoutLinks : loginLinks} />
      </header>
    </>
  );
};
