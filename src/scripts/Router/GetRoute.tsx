import { Login, Register, FindHotel } from "../../pages";
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
    default:
      return <Login />;
  }
};
