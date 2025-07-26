import { IHotelRoomProps } from "../../interfaces";
import classes from "./roomDesrciption.module.css";
const URL = import.meta.env.VITE_APP_NAMES_URL;

export const RoomDescription = (props: IHotelRoomProps) => {
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
        </div>
      </div>
    </>
  );
};
