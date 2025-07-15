import { Login, Register, FindHotel } from "../../pages";

export const GetRoute = (link: string | undefined): JSX.Element | undefined => {
  switch (link) {
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    case "/hotel-rooms":
      return <FindHotel />;
    default:
      return <Login />;
  }
};
