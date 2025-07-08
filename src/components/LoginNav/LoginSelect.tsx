import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./loginSelect.module.css";
import { ILoginAction } from "../../interfaces";

import { useAppDispatch } from "../../hooks";
import { AuthContext } from "../../context/AuthContext";
import { LogoutThunk } from "../../redux/thunks/LogoutThunk";
import { NavThunk } from "../../redux/thunks/NavThunk";

export const LoginSelect = (props: { actions: ILoginAction[] }) => {
  const [selectedOption, setSelectedOption] = useState(1);

  const dispatch = useAppDispatch();
  const { handleLogout } = useContext(AuthContext);

  const Logout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    dispatch(LogoutThunk())
      .unwrap()
      .then(() => {
        handleLogout();
        dispatch(NavThunk());
      });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  const getActionById = (id: number) => {
    return props.actions.find((el) => el.id === id);
  };
  const action = getActionById(selectedOption);
  return (
    <div className={classes["header-block"]}>
      <div className={classes["select-module"]}>
        <NavLink
          className={classes["select-button"]}
          key={action?.id ? action?.id : "1"}
          to={action?.link ? action?.link : "#"}
          onClick={action?.action ? Logout : undefined}
        >
          {action?.name}
        </NavLink>
        <div>
          <select
            className={classes["login-select"]}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {props.actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
