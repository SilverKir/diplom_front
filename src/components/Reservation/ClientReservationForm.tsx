import { IClientReservation } from "../../interfaces";
import { DeleteReservationById } from "../../scripts";
import { useAppDispatch } from "../../hooks";
import { GetDataFromApiThunk } from "../../redux";

export const ClientReservationForm = (props: {
  data: IClientReservation;
  updated: () => void;
}) => {
  const dispatch = useAppDispatch();
  const ConvertDate = (date: string): string => {
    const result = new Date(date);
    return result.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const DeleteReserve = async () => {
    await dispatch(GetDataFromApiThunk(DeleteReservationById(props.data.id)));
    console.log("kjhkjk");
    props.updated();
  };

  return (
    <>
      <td>{props.data.hotel.title}</td>
      <td> {ConvertDate(props.data.startDate)}</td>
      <td> {ConvertDate(props.data.endDate)}</td>
      <button onClick={DeleteReserve}>del</button>
    </>
  );
};
