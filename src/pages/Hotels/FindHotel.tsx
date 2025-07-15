import { FindHotelForm, HotelListForm } from "../../components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { GetError, GetHotels } from "../../scripts";
import { IFindHotelData, IHotelRoomProps } from "../../interfaces";
import { GetDataFromApiThunk } from "../../redux";

export const FindHotel = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState<IFindHotelData>({
    hotelTitle: undefined,
    dateStart: undefined,
    dateEnd: undefined,
  });

  const HandleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      GetDataFromApiThunk(GetHotels({ ...form, offset: 0, limit: 10 }))
    );
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
          
        )}
      </div>
    </>
  );
};
