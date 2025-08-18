import "./App.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useAppSelector } from "./hooks";
import { Layout } from "./components/Layout";
import { GetRoute } from "./scripts/Router/GetRoute";
import { Login, Room } from "./pages";
import { ClientReservationList } from "./pages/Reservation/ClientReservationList";

function App() {
  const { actions } = useAppSelector((state) => state.navActions);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {actions.nav.map((elem, index) => (
          <Route path={elem.link} element={GetRoute(elem.link)} key={index} />
        ))}
        <Route path="*" element={<Login />} />
        <Route path="/hotel-room/:id" element={<Room />} />
        <Route
          path="/manager/reservations/:id"
          element={<ClientReservationList />}
        />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
