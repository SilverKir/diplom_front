import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces";
import classes from "./UserListForm.module.css";
import { useAppDispatch } from "../../hooks";
import { SetTempData } from "../../redux";

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

  const reservedIcon = (
    <svg className={classes["icon"]} viewBox="0 0 1920 1920">
      <title>reserved</title>
      <path d="M1411.824 0c31.17 0 56.47 25.3 56.47 56.471v56.47h169.412c93.403 0 169.412 76.01 169.412 169.412V1920H113V282.353c0-93.402 76.009-169.412 169.412-169.412h169.41v-56.47c0-31.172 25.3-56.47 56.472-56.47s56.47 25.298 56.47 56.47v56.47h790.589v-56.47c0-31.172 25.299-56.47 56.47-56.47Zm282.352 564.705H225.942v1242.353h1468.234V564.705Zm-322.277 242.428 79.849 79.851-604.687 604.687-378.692-378.805 79.85-79.85 298.842 298.842 524.838-524.725Zm-920.076-581.25H282.412c-31.06 0-56.47 25.298-56.47 56.47v169.412h1468.234V282.353c0-31.172-25.411-56.47-56.47-56.47h-169.412v56.47c0 31.172-25.3 56.471-56.47 56.471-31.172 0-56.471-25.299-56.471-56.47v-56.472H564.765v56.471c0 31.172-25.3 56.471-56.471 56.471-31.171 0-56.471-25.299-56.471-56.47v-56.472Z" />
    </svg>
  );

  return (
    <>
      <td className={classes["table-cell"]}>{user.name}</td>
      <td> {user.contactPhone}</td>
      <td> {user.email}</td>
      {role === "manager" && (
        <button onClick={GetUserReservation}>
          <i>{reservedIcon}</i>
        </button>
      )}
    </>
  );
};
