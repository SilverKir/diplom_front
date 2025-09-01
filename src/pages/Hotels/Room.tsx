import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetDataFromApiThunk, SetError, setRoom } from "../../redux";
import { GetDataFromAPI, GetHotelById, SetReservation } from "../../scripts";
import { RoomDescription } from "../../components";
import { IHotelRoomProps } from "../../interfaces";
import classes from "./Room.module.css";

export const Room = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.apiAction);
  const [updated, setUpdated] = useState(false);
  const { actions } = useAppSelector((state) => state.navActions);
  const { startDate, endDate } = useAppSelector((state) => state.dateAction);
  const navigate = useNavigate();

  const canReserv = !actions.isAuth || actions.role === "client";

  const room = data as IHotelRoomProps;

  useEffect(() => {
    async function fetchData() {
      if (id) {
        await dispatch(GetDataFromApiThunk(GetHotelById(id)));
        setUpdated(true);
      }
    }
    fetchData();
  }, []);

  const handleReserve = async () => {
    if (!actions.isAuth) {
      dispatch(setRoom(room.id));
      dispatch(SetError(4035));
      navigate(`/register/`);
    } else if (actions.role === "client") {
      try {
        await GetDataFromAPI(
          SetReservation({
            hotelRoom: room.id,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
          })
        );
      } catch (e) {
        if ((e as Error).message === "400") {
          dispatch(SetError(4005));
        } else {
          dispatch(SetError((e as Error).message));
        }
      }

      navigate(`/client/reservations`);
    }
  };

  return (
    <>
      {!loading && updated && room && (
        <div className={classes["hotel-room-wrap"]}>
          <div className={classes["hotel-wrap"]}>
            <h3 className={classes["hotel-name"]}> {room.hotel.title}</h3>
            <div className={classes["hotel-description"]}>
              {room.hotel.description}
            </div>
          </div>
          <RoomDescription
            room={room}
            onClick={handleReserve}
            buttonVisible={canReserv}
            buttonName="Бронировать"
          />
        </div>
      )}
    </>
  );
};
