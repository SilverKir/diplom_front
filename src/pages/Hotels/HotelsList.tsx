import { useEffect, useState } from "react";
import { GetDataFromApiThunk } from "../../redux";
import { GetAllHotels } from "../../scripts";
import { CustomButton, editIcon, Pagination } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classes from "./HotelList.module.css";
import { ROWS_PER_PAGE } from "../../constants";
import { IHotel } from "../../interfaces";
import { Hotel } from "../";

export const HotelsList = () => {
  const [updated, setUpdated] = useState(false);
  const [table, setTable] = useState(true);
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.apiAction);

  const nullHotel = {
    id: "",
    title: "",
    description: "",
  };
  const [hotel, setHotel] = useState<IHotel>(nullHotel);

  const [page, setPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 80);
    setNotFirstPage(true);
  };

  const restartPagination = () => {
    setPage(2);
    setCurrentPage(0);
    setNotFirstPage(false);
    setMorePage(true);
  };

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
      setUpdated(true);
      restartPagination();
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

  return (
    <>
      {table && updated && !loading && (
        <div className={classes["form-wrap"]}>
          <div>
            {data &&
              Object.prototype.toString.call(data) === "[object Array]" && (
                <>
                  <div className={classes["title-wrap"]}>
                    <h2 className={classes["name-title"]}> Список гостиниц</h2>
                    <CustomButton
                      type="button"
                      text="Создать гостиницу"
                      onClick={() => {
                        handleHotel(nullHotel);
                      }}
                    />
                  </div>

                  <table className={classes["table-wrap"]}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Отель</th>
                        <th>Описание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data as IHotel[]).map((item: IHotel, index: number) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td className={classes["table-cell"]}>
                            {item.title}
                          </td>
                          <td className={classes["table-cell"]}>
                            {item.description}
                          </td>
                          <td>
                            <button
                              className={classes["trash-button"]}
                              onClick={() => {
                                handleHotel(item);
                              }}
                            >
                              <i>{editIcon}</i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(notFirstPage ||
                    (data as object[]).length === ROWS_PER_PAGE) && (
                    <Pagination
                      onClick={onPaginationClick}
                      totalPages={page}
                      currentPage={currentPage}
                      dataLength={(data as object[]).length}
                      setPage={setPage}
                      morePage={
                        (data as object[]).length === ROWS_PER_PAGE && morePage
                      }
                      setMoreРage={setMorePage}
                    />
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
