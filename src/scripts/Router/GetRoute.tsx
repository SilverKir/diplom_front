import {
  Login,
  Register,
  FindHotel,
  UsersList,
  AddNewUser,
  HotelsList,
  Hotel,
  ClientReservationList,
  Room,
} from "../../pages";

export const GetRoute = (link: string | undefined): JSX.Element | undefined => {
  switch (link) {
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    case "/hotel-rooms":
      return <FindHotel />;
    case "/client/reservations":
      return <ClientReservationList />;
    case "/admin/users":
      return <UsersList role="admin" />;
    case "/manager/users":
      return <UsersList role="manager" />;
    case "/admin/new_user":
      return <AddNewUser />;
    case "/admin/hotels":
      return <HotelsList />;
    case "/admin/hotel":
      return <Hotel />;
    case "/hotel-room/:id":
      return <Room />;
    case "/manager/reservations/:id":
      return <ClientReservationList />;

    default:
      return <Login />;
  }
};
