import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetReservation } from "../../scripts";
import { IClientReservation } from "../../interfaces";
import { ClientReservationForm } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";

export const ClientReservationList = () => {
  const [updated, setUpdated] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.apiAction);
  const { name } = useAppSelector((state) => state.authActions);
  useEffect(() => {
    async function fetchData() {
      dispatch(GetDataFromApiThunk(GetReservation()));
      setUpdated(true);
    }
    fetchData();
  }, []);

  return (
    <>
      {updated ? (
        <div>
          <h2>{name}</h2>
          <div>
            {data &&
            Object.prototype.toString.call(data) === "[object Array]" ? (
              <>
                <table>
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
                        {<ClientReservationForm {...item} />}
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
