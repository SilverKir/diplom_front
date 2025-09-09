import { useEffect, useState } from "react";
import { HotelForm, Pagination, RoomDescription } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IHotel, IHotelRoomProps } from "../../interfaces";
import {
  CreateHotel,
  GetError,
  GetRoomsByHotelId,
  UpdateHotel,
} from "../../scripts";
import { GetDataFromApiThunk } from "../../redux";
import { ROWS_PER_PAGE } from "../../constants";
import classes from "./Hotel.module.css";
import { RoomEdit } from "..";

type HotelProps = {
  hotel?: IHotel;
  onUpdate?: () => void;
};

export const Hotel = (props: HotelProps) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.apiAction);
  const [updated, setUpdated] = useState(false);
  const [page, setPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);
  const [notFirstPage, setNotFirstPage] = useState(false);
  const [morePage, setMorePage] = useState(true);
  const [editRoom, setEditRoom] = useState(false);
  const [room, setRoomId] = useState<IHotelRoomProps | undefined>(undefined);
  const [hotelId, setHotelId] = useState<string | undefined>(undefined);
  const [updateRooms, setUpdateRooms] = useState(false);

  const updatePage = () => {
    setUpdateRooms(!updateRooms);
  };

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

  const [form, setForm] = useState<IHotel>(
    props.hotel
      ? props.hotel
      : {
          id: "",
          title: "",
          description: "",
        }
  );

  useEffect(() => {
    async function fetchData() {
      if (props.hotel && props.hotel.id) {
        await dispatch(
          GetDataFromApiThunk(
            GetRoomsByHotelId({
              id: props.hotel.id,
              offset: 0,
              limit: ROWS_PER_PAGE,
            })
          )
        );
        setUpdated(true);
        restartPagination();
      }
    }

    fetchData();
  }, [updateRooms]);

  const onPaginationClick = async (clickPage: number) => {
    await dispatch(
      GetDataFromApiThunk(
        GetRoomsByHotelId({
          id: props.hotel?.id ? props.hotel?.id : "",
          offset: clickPage * ROWS_PER_PAGE,
          limit: ROWS_PER_PAGE,
        })
      )
    );
    handlePageChange(clickPage);
  };

  const UpdateRoom = (room?: IHotelRoomProps, hotelId?: string) => {
    setRoomId(room);
    setHotelId(hotelId);
    setEditRoom(true);
  };

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

  return !editRoom ? (
    <>
      <HotelForm
        form={form}
        setForm={setForm}
        onSubmit={HandleUpdateHotel}
        isError={error ? GetError(error) : undefined}
        isLoading={loading}
        onCancel={props.onUpdate}
        onCreateRoom={UpdateRoom}
      />
      {updated && data && (data as object[]).length > 0 && (
        <>
          <h2 className={classes["rooms-header"]}>Комнаты</h2>
          {(data as IHotelRoomProps[]).map(
            (room: IHotelRoomProps, index: number) => (
              <div key={index}>
                <RoomDescription
                  room={room}
                  buttonVisible={true}
                  buttonName="Редактировать"
                  onClick={UpdateRoom}
                />
              </div>
            )
          )}
          {(notFirstPage || (data as object[]).length === ROWS_PER_PAGE) && (
            <Pagination
              onClick={onPaginationClick}
              totalPages={page}
              currentPage={currentPage}
              dataLength={(data as object[]).length}
              setPage={setPage}
              morePage={(data as object[]).length === ROWS_PER_PAGE && morePage}
              setMoreРage={setMorePage}
            />
          )}
        </>
      )}
    </>
  ) : (
    <RoomEdit
      room={room}
      hotelId={hotelId ? hotelId : ""}
      setRoom={setEditRoom}
      onUpdate={updatePage}
    />
  );
};
