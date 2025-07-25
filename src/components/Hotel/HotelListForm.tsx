import { IHotelRoomProps } from "../../interfaces";
import classes from "./hotelListForm.module.css";
const URL = import.meta.env.VITE_APP_NAMES_URL;
import { CustomButton } from "../Custom/CustomButton";
import { useNavigate } from "react-router-dom";

export const HotelListForm = (props: IHotelRoomProps) => {
  const navigate = useNavigate();

  const handleHotel = () => {
    navigate(`/hotel-room/${props.id}`);
  };
  return (
    <>
      <article className={classes["hotel-room-wrap"]}>
        <img
          className={classes["hotel-room-image"]}
          src={props.images[0] ? URL + "/images/" + props.images[0] : ""}
          alt={
            props.images[0] ? "room photo of hotel " + props.hotel.title : ""
          }
        />
        <div className={classes["hotel-info-wrap"]}>
          <div className={classes["hotel-room-info"]}>
            <h4>{props.hotel.title}</h4>
            <div className={classes["hotel-room-description"]}>
              {props.description}
            </div>
          </div>

          <CustomButton
            className={classes["info-button"]}
            type="button"
            text="Подробнее"
            onClick={handleHotel}
            isLoading={false}
          />
        </div>
      </article>
    </>
  );
};
