import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetReservation, GetUserReservationById } from "../../scripts";
import { IClientReservation } from "../../interfaces";
import { ClientReservationForm } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./ClientReservationList.module.css";

export const ClientReservationList = () => {
  const { id } = useParams();
  const [updated, setUpdated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.apiAction);
  const { name } = useAppSelector((state) => state.authActions);
  const { tempData } = useAppSelector((state) => state.tempAction);
  const userName = id ? tempData : name;

  const UpdatePage = () => {
    setLoaded(false);
    setUpdated(!updated);
  };

  useEffect(() => {
    async function fetchData() {
      if (id) {
        await dispatch(GetDataFromApiThunk(GetUserReservationById(id)));
      } else {
        await dispatch(GetDataFromApiThunk(GetReservation()));
      }
      setLoaded(true);
    }
    fetchData();
  }, [updated]);

  return (
    <>
      {loaded && (
        <div className={classes["form-wrap"]}>
          <h2 className={classes["name-title"]}>{userName}</h2>
          <div>
            {data &&
              Object.prototype.toString.call(data) === "[object Array]" && (
                <>
                  <table className={classes["table-wrap"]}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Отель</th>
                        <th>Дата заезда</th>
                        <th>Дата выезда</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data as IClientReservation[]).map(
                        (item: IClientReservation, index: number) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {
                              <ClientReservationForm
                                reservationData={item}
                                UpdateList={UpdatePage}
                                key={item.id}
                              />
                            }
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </>
              )}{" "}
          </div>
        </div>
      )}
    </>
  );
};
