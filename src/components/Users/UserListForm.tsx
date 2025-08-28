import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces";
import classes from "./UserListForm.module.css";
import { useAppDispatch } from "../../hooks";
import { SetTempData } from "../../redux";
import { reservedIcon } from "../../components";

type IUserListFormProps = {
  user: IUser;
  role: string;
};

export const UserListForm = (props: IUserListFormProps) => {
  const navigate = useNavigate();
  const { user, role } = props;
  const dispatch = useAppDispatch();

  const GetUserReservation = () => {
    dispatch(SetTempData(props.user.name));
    navigate(`/manager/reservations/${props.user.id}`);
  };

  return (
    <>
      <td className={classes["table-cell"]}>{user.name}</td>
      <td> {user.contactPhone}</td>
      <td> {user.email}</td>

      {role === "manager" && (
        <td>
          <button onClick={GetUserReservation}>
            <i>{reservedIcon}</i>
          </button>
        </td>
      )}
    </>
  );
};
