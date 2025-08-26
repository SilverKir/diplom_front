import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetAllHotels } from "../../scripts";
import { editIcon, Pagination } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./HotelList.module.css";
import { ROWS_PER_PAGE } from "../../constants";
import { IHotel } from "../../interfaces";

import { Hotel } from "./Hotel";

export const HotelsList = () => {
  const [updated, setUpdated] = useState(false);
  const [table, setTable] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.apiAction);

  const [page, setPage] = useState(2);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const [hotel, setHotel] = useState<IHotel>({
    id: "",
    title: "",
    description: "",
  });

  const handleHotel = (data: IHotel) => {
    setHotel(data);
    setTable(false);
  };

  const handleUpdateHotel = () => {
    setUpdated(!updated);
    setTable(true);
  };

  useEffect(() => {
    async function fetchData() {
      await dispatch(
        GetDataFromApiThunk(GetAllHotels({ offset: 0, limit: ROWS_PER_PAGE }))
      );
      setLoaded(true);
    }
    fetchData();
  }, [updated]);

  const onPaginationClick = async (clickPage: number) => {
    await dispatch(
      GetDataFromApiThunk(
        GetAllHotels({
          offset: clickPage * ROWS_PER_PAGE,
          limit: ROWS_PER_PAGE,
        })
      )
    );
    handlePageChange(clickPage);
  };

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 80);
    setNotFirstPage(true);
    if (data && Object.prototype.toString.call(data) === "[object Array]") {
      if (data.length === 0) {
        setPage(page - 1);
      }
      if (data.length === ROWS_PER_PAGE && morePage) {
        if (newPage === page - 1) {
          setPage(page + 1);
        }
      } else {
        setMorePage(false);
      }
    }
  };

  return (
    <>
      {table && loaded && (
        <div className={classes["form-wrap"]}>
          <div>
            {data &&
              Object.prototype.toString.call(data) === "[object Array]" && (
                <>
                  <table className={classes["table-wrap"]}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Отель</th>
                        <th>Описание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item: IHotel, index: number) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td className={classes["table-cell"]}>
                            {item.title}
                          </td>
                          <td className={classes["table-cell"]}>
                            {item.description}
                          </td>
                          <button
                            className={classes["trash-button"]}
                            onClick={() => {
                              handleHotel(item);
                            }}
                          >
                            <i>{editIcon}</i>
                          </button>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(notFirstPage || data.length === ROWS_PER_PAGE) && (
                    <div className={classes["pagination"]}>
                      <Pagination
                        onClick={onPaginationClick}
                        totalPages={page}
                      />
                      <div>{morePage && "..."}</div>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      )}
      {!table && <Hotel hotel={hotel} onUpdate={handleUpdateHotel} />}
    </>
  );
};
