import { LoginSelect } from "../LoginNav/LoginSelect";
import { Logo } from "../Logo/Logo";
import classes from "./header.module.css";
import { actions } from "../../constants/login";

export const Header = () => {
  return (
    <>
      <header className={classes["header"]}>
        <Logo />
        <LoginSelect actions={actions} />    
      </header>
    </>
  );
};
