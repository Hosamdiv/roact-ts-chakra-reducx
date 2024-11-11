import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import CartDrawer from "../components/components/CartDrawer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />

      <Outlet />
    </>
  );
};

export default RootLayout;
