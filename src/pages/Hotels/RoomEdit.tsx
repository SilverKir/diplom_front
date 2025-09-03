import { RoomForm } from "../../components";
import { IHotelRoomProps } from "../../interfaces";

type RoomEditProps = {
  room?: IHotelRoomProps;
  hotelId?: string;
  onUpdate?: () => void;
};

export const RoomEdit = (props: RoomEditProps) => {
  return (
    <>
      <div>RoomEdit</div>
      <RoomForm />
    </>
  );
};
