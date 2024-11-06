import { Outlet } from "react-router";
import Navbar from "../Layout/Navbar";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar/>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
