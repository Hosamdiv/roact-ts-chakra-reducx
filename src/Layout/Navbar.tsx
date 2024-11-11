import { MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { useColorMode } from "../components/ui/color-mode";
import { MenuContent } from "../components/ui/menu";
import { Button } from "../components/ui/button";
import { Avatar } from "../components/ui/avatar";
import CookieService from "../services/CookieService";
import { selectCart } from "../App/features/CartSlice";
import { useSelector } from "react-redux";
import { onOpenCartDrawerAction } from "../App/features/globalSlice";
import { useAppDispatch } from "../App/store";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const token = CookieService.get("jwt");
  const logoutHandler = () => {
    CookieService.remove("jwt");
    window.location.reload();
  };
  const onOpen = () => dispatch(onOpenCartDrawerAction());

  const { cartProducts } = useSelector(selectCart);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <nav
      className={`flex justify-between items-center fixed w-full
        top-0 shadow-md z-50 ${
          colorMode === "light" ? "bg-gray-200" : "bg-gray-900"
        } px-5 py-3`}
    >
      <ul className="flex items-center px-10">
        <li
          className={` text-${
            colorMode === "light" ? "black" : "white"
          } rounded-md p-2 duration-200 font-bold text-xl`}
        >
          <NavLink to="/">Home</NavLink>
        </li>
        <li
          className={`duration-200 hover:bg-gray-500 mx-5 rounded-md p-1 text-lg`}
        >
          <NavLink to="/about">About</NavLink>
        </li>
        <li
          className={`duration-200 hover:bg-gray-500 mx-5 rounded-md p-1 text-lg`}
        >
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
      <div
        className={`flex items-center space-x-4 text-${
          colorMode === "light" ? "black" : "white"
        }`}
      >
        <Button className="hover:bg-gray-500" onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon /> : <IoMdSunny />}
        </Button>
        <Button onClick={onOpen}>cart({cartProducts.length})</Button>
        {token ? (
          <MenuRoot positioning={{ placement: "right-start" }}>
            <MenuTrigger asChild>
              <button>
                <Avatar
                  name="Sage Adebayo"
                  src="https://bit.ly/sage-adebayo"
                  shape="rounded"
                  size="lg"
                />
              </button>
            </MenuTrigger>

            <MenuContent mt={"55px"}>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
              <MenuItem value="new-win">New Window</MenuItem>
              <MenuItem value="open-file">Open File...</MenuItem>
              <MenuItem onClick={logoutHandler} value="logout">
                Logout
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        ) : (
          <NavLink
            to="/login"
            className={`duration-200 hover:bg-gray-500 rounded-md p-1 text-lg`}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
