import { useState } from "react";
import { HotelForm } from "../../components/Hotel/HotelForm";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IHotel } from "../../interfaces";
import { CreateHotel, GetError, UpdateHotel } from "../../scripts";
import { GetDataFromApiThunk } from "../../redux";

type HotelProps = {
  hotel?: IHotel;
  onUpdate?: () => void;
};

export const Hotel = (props: HotelProps) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.apiAction);
  const [form, setForm] = useState<IHotel>(
    props.hotel
      ? props.hotel
      : {
          id: "",
          title: "",
          description: "",
        }
  );

  const HandleUpdateHotel = async () => {
    if (form.id) {
      await dispatch(
        GetDataFromApiThunk(
          UpdateHotel({
            ...form,
          })
        )
      );
    } else {
      await dispatch(
        GetDataFromApiThunk(
          CreateHotel({
            title: form.title,
            description: form.description,
          })
        )
      );
    }
  };

  return (
    <>
      <HotelForm
        form={form}
        setForm={setForm}
        onSubmit={HandleUpdateHotel}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
        onCancel={props.onUpdate}
      />
    </>
  );
};
