import { IHotelRoomProps } from "../../interfaces";
import classes from "./hotelListForm.module.css";
const URL = import.meta.env.VITE_APP_NAMES_URL;

export const HotelListForm = (props: IHotelRoomProps) => {
  return (
    <>
      <article className={classes["hotel-room-wrap"]}>
        <h4>{props.hotel.title}</h4>
        <div className={classes["hotel-room-description"]}>
          {props.description}
        </div>
        <img
          src={props.images[0] ? URL + "/images/" + props.images[0] : ""}
          alt={props.images[0] ? URL + "/images/" + props.images[0] : ""}
        />
      </article>
    </>
  );
};
