import { IHotelRoomProps } from "../../interfaces";

export const HotelListForm = (props: IHotelRoomProps) => {
  console.log(props);
  return (
    <>
      <h4>{props.hotel.title}</h4>
    </>
  );
};
