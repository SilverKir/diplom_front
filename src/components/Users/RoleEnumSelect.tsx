import { ChangeEvent } from "react";
import { Role } from "../../constants/login";
import classes from "./RoleEnumSelect.module.css";

export const RoleSelect = (props: {
  currentRole: Role;
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const { currentRole, name, onChange } = props;

  const getKeys = (enumVariable: { [key in string]: string }) => {
    return Object.keys(enumVariable) as Array<string>;
  };

  return (
    <select
      className={classes["select-field"]}
      name={name}
      value={currentRole}
      onChange={onChange}
    >
      {getKeys(Role).map((data, index) => (
        <option key={index} value={Role[data as keyof typeof Role]}>
          {data}
        </option>
      ))}
    </select>
  );
};
