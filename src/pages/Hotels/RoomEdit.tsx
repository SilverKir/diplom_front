import { Dispatch, SetStateAction } from "react";
import { RoomForm } from "../../components";
import { IHotelRoomProps } from "../../interfaces";
import classes from "./RoomEdit.module.css";

const URL = import.meta.env.VITE_APP_NAMES_URL;

type RoomEditProps = {
  room?: IHotelRoomProps;
  hotelId?: string;
  onUpdate?: () => void;
  setRoom: Dispatch<SetStateAction<boolean>>;
};

export const RoomEdit = (props: RoomEditProps) => {
  const roomImages: string[] = [];
  if (props.room && props.room.images) {
    props.room.images.map((image) => {
      if (image) {
        roomImages.push(URL + "/images/" + image);
      }
    });
  }

  const onCancel = () => {
    props.setRoom(false);
  };

  return (
    <>
      <div className={classes["form-wrap"]}>
        <div>RoomEdit</div>
        <RoomForm
          images={roomImages}
          description={props.room?.description}
          isEnabled={props.room?.isEnabled}
          onCancel={onCancel}
        />
      </div>
    </>
  );
};
