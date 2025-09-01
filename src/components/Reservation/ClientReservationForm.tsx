import { IClientReservation } from "../../interfaces";
import { DeleteReservationById, GetDataFromAPI } from "../../scripts";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SetError, SetLoading } from "../../redux";
import classes from "./ClientReservationForm.module.css";
import { trashIcon } from "../Custom";

type IClientReservationProps = {
  reservationData: IClientReservation;
  UpdateList: () => void;
};

export const ClientReservationForm = (props: IClientReservationProps) => {
  const { reservationData, UpdateList } = props;
  const dispatch = useAppDispatch();
  const { actions } = useAppSelector((state) => state.navActions);

  const ConvertDate = (date: string): string => {
    const result = new Date(date);
    return result.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const DeleteReserve = async () => {
    dispatch(SetLoading(true));
    try {
      await GetDataFromAPI(
        DeleteReservationById(reservationData.id, actions.role)
      );
      UpdateList();
    } catch (e) {
      if ((e as Error).message === "400") {
        dispatch(SetError(4006));
      } else {
        dispatch(SetError((e as Error).message));
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
      <td>
        <button className={classes["trash-button"]} onClick={DeleteReserve}>
          <i>{trashIcon}</i>
        </button>
      </td>
    </>
  );
};
