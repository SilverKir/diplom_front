import { Login, Register, FindHotel, UsersList } from "../../pages";
import { ClientReservationList } from "../../pages/Reservation/ClientReservationList";

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
    default:
      return <Login />;
  }
};
