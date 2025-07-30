import { useNavigate } from "react-router-dom";
import { IHotelRoomProps } from "../../interfaces";
import { CustomButton } from "../Custom/CustomButton";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetDataFromApiThunk, setRoom } from "../../redux";
import classes from "./roomDesrciption.module.css";
import { SetReservation } from "../../scripts";

const URL = import.meta.env.VITE_APP_NAMES_URL;

export const RoomDescription = (props: IHotelRoomProps) => {
  const dispatch = useAppDispatch();
  const { actions } = useAppSelector((state) => state.navActions);
  const { startDate, endDate, roomId } = useAppSelector(
    (state) => state.dateAction
  );
  const navigate = useNavigate();
  const handleReserve = () => {
    if (!actions.isAuth) {
      dispatch(setRoom(props.id));
      navigate(`/login/`);
    } else if (actions.role === "client") {
      dispatch(
        GetDataFromApiThunk(
          SetReservation({
            hotelRoom: props.id,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
          })
        )
      );
      navigate(`/client/reservations`);
    }
  };

  return (
    <>
      <div className={classes["hotel-room-wrap"]}>
        <div className={classes["hotel-wrap"]}>
          <h3 className={classes["hotel-name"]}> {props.hotel.title}</h3>
          <div className={classes["hotel-description"]}>
            {props.hotel.description}
          </div>
        </div>
        <div className={classes["room-wrap"]}>
          <div className={classes["images-wrap"]}>
            {props.images.map((image) => {
              return (
                <img
                  className={classes["hotel-room-image"]}
                  src={image ? URL + "/images/" + image : ""}
                  alt={image ? "room photo of hotel " + props.description : ""}
                />
              );
            })}
          </div>
          <div className={classes["room-description"]}>{props.description}</div>
          <CustomButton
            className={classes["info-button"]}
            type="button"
            text="Бронировать"
            onClick={handleReserve}
            isLoading={false}
          />
        </div>
      </div>
    </>
  );
};
