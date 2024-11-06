import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { IoMdSunny } from "react-icons/io";
import { useColorMode } from "../components/ui/color-mode"; // تأكد من استخدام useColorMode من Chakra UI

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <nav
      className={`flex justify-between items-center ${
        colorMode === "light" ? "bg-gray-200" : "bg-gray-900"
      }  px-5 py-3`}
    >
      <ul className="flex items-center px-10">
        <li
          className={` text-${
            colorMode === "light" ? "black" : "white"
          } rounded-md p-2 duration-200 font-bold text-xl`}
        >
          <NavLink to="/">Home</NavLink>
        </li>
        <li className={`duration-200 hover:bg-gray-500 mx-5 rounded-md p-1 text-lg`}>
          <NavLink to="/about">About</NavLink>
        </li>
        <li className={`duration-200 hover:bg-gray-500 mx-5 rounded-md p-1 text-lg`}>
          <NavLink to="/product">Product</NavLink>
        </li>
      </ul>
      <div
        className={`flex items-center space-x-4 text-${
          colorMode === "light" ? "black" : "white"
        }`}
      >
        <NavLink
          to="/login"
          className={`duration-200 hover:bg-gray-500 rounded-md p-1 text-lg`}
        >
          Login
        </NavLink>
        <Button className="hover:bg-gray-500" onClick={toggleColorMode}>
          {colorMode === "light" ? <IoMoon /> : <IoMdSunny />}
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
