import { FindHotelForm, HotelListForm, Pagination } from "../../components";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError, GetHotels } from "../../scripts";
import { IFindHotelData, IHotelRoomProps } from "../../interfaces";
import { GetDataFromApiThunk } from "../../redux";
import { ROWS_PER_PAGE } from "../../constants";

export const FindHotel = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState<IFindHotelData>({
    hotelTitle: undefined,
    dateStart: undefined,
    dateEnd: undefined,
  });
  const scrollY = useRef(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, scrollY.current);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    scrollY.current = 80;
    setPage(newPage);
  };

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      GetDataFromApiThunk(
        GetHotels({ ...form, offset: 0, limit: ROWS_PER_PAGE })
      )
    );
  };

  const onPaginationClick = async (page: number) => {
    await dispatch(
      GetDataFromApiThunk(
        GetHotels({
          ...form,
          offset: page * ROWS_PER_PAGE,
          limit: ROWS_PER_PAGE,
        })
      )
    );
    handlePageChange(page + 1);
  };

  return (
    <>
      <FindHotelForm
        form={form}
        setForm={setForm}
        onSubmit={HandleLogin}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
      />
      <div>
        {data && Object.prototype.toString.call(data) === "[object Array]" ? (
          <ul>
            {data.map((item: IHotelRoomProps, index: number) => (
              <li key={index}>{<HotelListForm {...item} />}</li>
            ))}
          </ul>
        ) : (
          ""
        )}{" "}
        <Pagination onClick={onPaginationClick} totalPages={3} />
      </div>
    </>
  );
};
