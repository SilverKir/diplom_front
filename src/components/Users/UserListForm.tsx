import { IUser } from "../../interfaces";
import classes from "./UserListForm.module.css";

type IUserListFormProps = {
  user: IUser;
  role: string;
};

export const UserListForm = (props: IUserListFormProps) => {
  const { user, role } = props;

  return (
    <>
      <td className={classes["table-cell"]}>{user.name}</td>
      <td> {user.contactPhone}</td>
      <td> {user.email}</td>
      {/* <button className={classes["trash-button"]} onClick={DeleteReserve}>
        <i>{trashCan}</i>
      </button> */}
    </>
  );
};
