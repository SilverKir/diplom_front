import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./loginSelect.module.css";
import { ILoginAction } from "../../interfaces";

export const LoginSelect = (props: { actions: ILoginAction[] }) => {
  const [selectedOption, setSelectedOption] = useState(1);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  const getActionById = (id: number) => {
    return props.actions.find((el) => el.id === id);
  };
  const action = getActionById(selectedOption);
  return (
    <div className={classes["select-module"]}>
      {/* <button className= {classes["select-button"]} onClick={action?.action}>{action?.name}</button> */}
      <NavLink className={classes["select-button"]} to={"/login"}>
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
  );
};
