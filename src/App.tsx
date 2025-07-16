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
// import { Login } from "./pages";

function App() {
  const { actions } = useAppSelector((state) => state.navActions);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {actions.nav.map((elem) => (
          <Route path={elem.link} element={GetRoute(elem.link)} />
        ))}
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
