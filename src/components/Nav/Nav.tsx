import { NavLink } from "react-router-dom";
import { ILoginAction } from "../../interfaces";
import classes from "./nav.module.css";

export const Nav = (props: { actions: ILoginAction[] }) => {
  return (
    <>
      <div className={classes["nav-wrap"]}>
        {props.actions.map((action) => {
          return (
            <NavLink
              className={classes["nav-link"]}
              to={action?.link ? action?.link : "#"}
              onClick={action?.action ? action.action : undefined}
            >
              &gt; {action?.name}
            </NavLink>
          );
        })}
      </div>
    </>
  );
};
