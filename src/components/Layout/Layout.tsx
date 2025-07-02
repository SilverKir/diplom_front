import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Nav } from "../Nav/Nav";
import { useAppSelector } from "../../hooks";
import classes from "./layout.module.css";

export const Layout = () => {
  const { navActions } = useAppSelector((state) => state.navActions);
  return (
    <div className="site-container">
      <Header />
      <div className={classes["nav-layot"]}>
        <Nav actions={navActions} />
        <main className={classes["main-wrap"]}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
