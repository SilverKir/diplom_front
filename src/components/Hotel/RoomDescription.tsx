import { IHotelRoomProps } from "../../interfaces";
import { CustomButton } from "..";

import classes from "./roomDesrciption.module.css";

const URL = import.meta.env.VITE_APP_NAMES_URL;

type RoomDescriptionProps = {
  room: IHotelRoomProps;
  onClick: (room?: IHotelRoomProps, hotelId?: string) => void;
  buttonVisible: boolean;
  buttonName: string;
};

export const RoomDescription = (props: RoomDescriptionProps) => {
  return (
    <>
      <div className={classes["room-wrap"]}>
        <div className={classes["images-wrap"]}>
          {props.room.images.map((image, index) => {
            return (
              <img
                key={index}
                className={classes["hotel-room-image"]}
                src={image ? URL + "/images/" + image : ""}
                alt={
                  image ? "room photo of hotel " + props.room.description : ""
                }
              />
            );
          })}
        </div>
        <div className={classes["room-description"]}>
          {props.room.description}
        </div>
        {props.buttonVisible && (
          <CustomButton
            className={classes["info-button"]}
            type="button"
            text={props.buttonName}
            onClick={() => {
              props.onClick(props.room, props.room.hotel.id);
            }}
            isLoading={false}
          />
        )}
      </div>
    </>
  );
};
