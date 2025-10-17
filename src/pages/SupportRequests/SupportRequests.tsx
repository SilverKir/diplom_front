import { useNavigate } from "react-router-dom";
import classes from "./SupportRequests.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetDataFromApiThunk } from "../../redux";
import {
  ConvertDate,
  GetClientSupportRequests,
  GetManagerSupportRequests,
} from "../../scripts";
import { ROWS_PER_PAGE } from "../../constants";
import { ISupportRequest } from "../../interfaces";
import { Pagination } from "../../components";

export const SupportRequests = () => {
  const [loaded, setLoaded] = useState(false);
  const [isActive, setActive] = useState(true);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.apiAction);
  const { actions } = useAppSelector((state) => state.navActions);
  const [page, setPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const navigate = useNavigate();
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

  const onPaginationClick = async (clickPage: number) => {
    await GetData(clickPage * ROWS_PER_PAGE, ROWS_PER_PAGE, isActive);
    handlePageChange(clickPage);
  };

  const GetData = async (offset: number, limit: number, isActive: boolean) => {
    if (actions.role === "client") {
      await dispatch(
        GetDataFromApiThunk(
          GetClientSupportRequests({
            offset: offset,
            limit: limit,
            isActive: isActive,
          })
        )
      );
    } else {
      await dispatch(
        GetDataFromApiThunk(
          GetManagerSupportRequests({
            offset: offset,
            limit: limit,
            isActive: isActive,
          })
        )
      );
    }
  };

  useEffect(() => {
    async function fetchData() {
      await GetData(0, ROWS_PER_PAGE, isActive);
      setLoaded(true);
      restartPagination();
    }
    fetchData();
  }, [isActive]);

  return (
    <>
      {loaded && (
        <div className={classes["form-wrap"]}>
          <h1> Обращения в поддержку</h1>

          <div>
            {data &&
              Object.prototype.toString.call(data) === "[object Array]" && (
                <>
                  <div className={classes["active-checkbox"]}>
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => setActive(!isActive)}
                    />
                    <p> {isActive ? "активные" : "неактивные"}</p>
                  </div>
                  <table className={classes["table-wrap"]}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Дата создания</th>
                        <th>Активно</th>
                        <th>Есть новые сообщения</th>
                        {actions.role === "manager" && <th>Клиент</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {(data as ISupportRequest[]).map(
                        (item: ISupportRequest, index: number) => (
                          <tr
                            key={index}
                            onClick={() => {
                              navigate(`/common/support-requests/${item.id}`);
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{ConvertDate(item.createdAt)}</td>
                            <td>{item.hasNewMessages ? "Да" : "Нет"}</td>
                            <td>{item.isActive ? "Да" : "Нет"}</td>
                            {item.client && <td>{item.client.name}</td>}
                          </tr>
                        )
                      )}
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
    </>
  );
};
