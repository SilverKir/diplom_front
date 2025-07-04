import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Nav } from "../Nav/Nav";
import { useAppSelector } from "../../hooks";
import classes from "./layout.module.css";

export const Layout = () => {
  const { actions } = useAppSelector((state) => state.navActions);
  return (
    <div className="site-container">
      <Header />
      <div className={classes["nav-layot"]}>
        <Nav actions={actions.nav} />
        <main className={classes["main-wrap"]}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
