import { Login, Register } from "../../pages";

export const GetRoute = (link: string | undefined): JSX.Element | undefined => {
  switch (link) {
    case "/login":
      return <Login />;
    case "/register":
      return <Register />;
    default:
      return <Login />;
  }
};
