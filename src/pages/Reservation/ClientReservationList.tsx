import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetReservation } from "../../scripts";
import { IClientReservation } from "../../interfaces";
import { ClientReservationForm } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./ClientReservationList.module.css";

export const ClientReservationList = () => {
  const [updated, setUpdated] = useState(false);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.apiAction);
  const { name } = useAppSelector((state) => state.authActions);
  const UpdatePage = () => {
    console.log(updated);
    setUpdated(false);
  };

  useEffect(() => {
    async function fetchData() {
      dispatch(GetDataFromApiThunk(GetReservation()));
      setUpdated(true);
    }
    fetchData();
  }, [dispatch, updated]);

  return (
    <>
      {updated ? (
        <div className={classes["form-wrap"]}>
          <h2 className={classes["name-title"]}>{name}</h2>
          <div>
            {data &&
            Object.prototype.toString.call(data) === "[object Array]" ? (
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
                    {data.map((item: IClientReservation, index: number) => (
                      <tr>
                        <td>{index + 1}</td>
                        {
                          <ClientReservationForm
                            {...{ data: { ...item }, updated: { UpdatePage } }}
                          />
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              ""
            )}{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
