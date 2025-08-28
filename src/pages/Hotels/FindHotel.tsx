import { FindHotelForm, HotelListForm, Pagination } from "../../components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError, GetHotels } from "../../scripts";
import { IFindHotelData, IHotelRoomProps } from "../../interfaces";
import { GetDataFromApiThunk, setStartDate, setEndDate } from "../../redux";
import { ROWS_PER_PAGE } from "../../constants";
import classes from "./findHotel.module.css";

export const FindHotel = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState<IFindHotelData>({
    hotelTitle: "",
    dateStart: new Date(),
    dateEnd: new Date(),
  });

  const [page, setPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const [updated, setUpdated] = useState(false);

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

  const HandleGetData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      GetDataFromApiThunk(
        GetHotels({ ...form, offset: 0, limit: ROWS_PER_PAGE })
      )
    );
    setUpdated(true);
    dispatch(setStartDate(form.dateStart));
    dispatch(setEndDate(form.dateEnd));
    restartPagination();
  };

  const onPaginationClick = async (clickPage: number) => {
    await dispatch(
      GetDataFromApiThunk(
        GetHotels({
          ...form,
          offset: clickPage * ROWS_PER_PAGE,
          limit: ROWS_PER_PAGE,
        })
      )
    );
    handlePageChange(clickPage);
  };

  return (
    <>
      <FindHotelForm
        form={form}
        setForm={setForm}
        onSubmit={HandleGetData}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
      <div>
        {updated &&
          !loading &&
          data &&
          Object.prototype.toString.call(data) === "[object Array]" && (
            <>
              <ul>
                {data.map((item: IHotelRoomProps) => (
                  <li key={item.id}>{<HotelListForm {...item} />}</li>
                ))}
              </ul>

              {(notFirstPage || data.length === ROWS_PER_PAGE) && (
                <Pagination
                  onClick={onPaginationClick}
                  totalPages={page}
                  currentPage={currentPage}
                  dataLength={data.length}
                  setPage={setPage}
                  morePage={data.length === ROWS_PER_PAGE && morePage}
                  setMoreРage={setMorePage}
                />
              )}
            </>
          )}
      </div>
    </>
  );
};
