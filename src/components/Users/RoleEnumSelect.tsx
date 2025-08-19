import { Role } from "../../constants/login";
import classes from "./RoleEnumSelect.module.css";

export const RoleSelect = (props: {
  currentRole: Role;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      //   onChange={(e) => {
      //     setCurrentRole(Role[e.target.value as keyof typeof Role])}};
    >
      {getKeys(Role).map((data, index) => (
        <option key={index} value={Role[data]}>
          {data}
        </option>
      ))}
    </select>
  );
};
