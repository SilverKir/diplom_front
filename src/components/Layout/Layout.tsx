import { Outlet } from "react-router-dom";
import { Header } from "../Header";

export const Layout = () => {
  return (
    <div className="site-container">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
