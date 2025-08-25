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
    hotelTitle: undefined,
    dateStart: undefined,
    dateEnd: undefined,
  });

  const [page, setPage] = useState(2);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const [updated, setUpdated] = useState(false);

  
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
          data &&
          Object.prototype.toString.call(data) === "[object Array]" && (
            <>
              <ul>
                {data.map((item: IHotelRoomProps) => (
                  <li key={item.id}>{<HotelListForm {...item} />}</li>
                ))}
              </ul>

              {(notFirstPage || data.length === ROWS_PER_PAGE) && (
                <div className={classes["pagination"]}>
                  <Pagination onClick={onPaginationClick} totalPages={page} />
                  <div>{morePage && "..."}</div>
                </div>
              )}
            </>
          )}
      </div>
    </>
  );
};
