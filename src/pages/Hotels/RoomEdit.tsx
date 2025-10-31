import { Dispatch, SetStateAction } from "react";
import { RoomForm } from "../../components";
import { IHotelRoomProps, IRoom, IUpdateRoomProps } from "../../interfaces";
import classes from "./RoomEdit.module.css";
import { useAppDispatch } from "../../hooks";
import { SetError } from "../../redux";
import { CreateRoom, SendFormDataToAPI, UpdateRoom } from "../../scripts";

const URL = import.meta.env.VITE_APP_NAMES_URL;

type RoomEditProps = {
  room?: IHotelRoomProps;
  hotelId: string;
  onUpdate?: () => void;
  setRoom: Dispatch<SetStateAction<boolean>>;
};

export const RoomEdit = (props: RoomEditProps) => {
  const dispatch = useAppDispatch();
  const roomImages: string[] = [];
  if (props.room && props.room.images) {
    props.room.images.map((image) => {
      if (image) {
        roomImages.push(URL + "/api/images/" + image);
      }
    });
  }

  const onCancel = () => {
    props.setRoom(false);
  };

  const updateRoom = async (roomData: IUpdateRoomProps) => {
    let newRoom: IRoom = { hotelId: props.hotelId, ...roomData };
    if (props.room?.id) {
      newRoom = { ...newRoom, id: props.room.id };
      const arg = UpdateRoom(newRoom);
      try {
        await SendFormDataToAPI(arg);
        props.setRoom(false);
        if (props.onUpdate) props.onUpdate();
      } catch (e) {
        dispatch(SetError(e));
      }
    } else {
      const arg = CreateRoom(newRoom);
      try {
        await SendFormDataToAPI(arg);
        props.setRoom(false);
        if (props.onUpdate) props.onUpdate();
      } catch (e) {
        dispatch(SetError(e));
      }
    }
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
          onSubmit={updateRoom}
        />
      </div>
    </>
  );
};
