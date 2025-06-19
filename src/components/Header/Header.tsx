import { LoginSelect } from "../LoginNav/LoginSelect";
import { Logo } from "../Logo/Logo";
import classes from "./header.module.css";
import { useAppSelector } from "../../hooks";

export const Header = () => {
  const { loginActions } = useAppSelector((state) => state.loginActions);

  return (
    <>
      <header className={classes["header"]}>
        <Logo />
        <LoginSelect actions={loginActions} />
      </header>
    </>
  );
};
