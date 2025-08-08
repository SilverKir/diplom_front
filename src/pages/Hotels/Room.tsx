import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetHotelById } from "../../scripts";
import { RoomDescription } from "../../components";

export const Room = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await dispatch(GetDataFromApiThunk(GetHotelById(id)));
      setUpdated(true);
    }
    fetchData();
  }, []);
  const { data } = useAppSelector((state) => state.apiAction);

  return <>{updated ? <RoomDescription {...data} /> : ""}</>;
};
