import { IClientReservation } from "../../interfaces";
import { DeleteReservationById, GetDataFromAPI } from "../../scripts";
import { useAppDispatch } from "../../hooks";
import { SetError, SetLoading } from "../../redux";
import classes from "./ClientReservationForm.module.css";

type IClientReservationProps = {
  reservationData: IClientReservation;
  UpdateList: () => void;
};

export const ClientReservationForm = (props: IClientReservationProps) => {
  const { reservationData, UpdateList } = props;
  const dispatch = useAppDispatch();
  const ConvertDate = (date: string): string => {
    const result = new Date(date);
    return result.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const trashCan = (
    <svg className={classes["trash"]} viewBox="0 0 110.61 122.88">
      <title>trash</title>
      <path d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z" />
    </svg>
  );

  const DeleteReserve = async () => {
    dispatch(SetLoading(true));
    try {
      await GetDataFromAPI(DeleteReservationById(reservationData.id));
      UpdateList();
    } catch (e) {
      if (e.message === 400) {
        dispatch(SetError(4006));
      } else {
        dispatch(SetError(e.message));
      }
    } finally {
      dispatch(SetLoading(false));
    }
  };

  return (
    <>
      <td className={classes["table-cell"]}>{reservationData.hotel.title}</td>
      <td> {ConvertDate(reservationData.startDate)}</td>
      <td> {ConvertDate(reservationData.endDate)}</td>
      <button className={classes["trash-button"]} onClick={DeleteReserve}>
        <i>{trashCan}</i>
      </button>
    </>
  );
};
