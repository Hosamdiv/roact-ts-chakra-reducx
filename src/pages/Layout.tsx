import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import CartDrawer from "../components/components/CartDrawer";
import { Toaster } from "../components/ui/toaster";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Toaster />
      <Outlet />
    </>
  );
};

export default RootLayout;
