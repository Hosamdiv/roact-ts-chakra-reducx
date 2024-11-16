import { HiHome } from "react-icons/hi";
import { Avatar } from "../../components/ui/avatar";
import { IconType } from "react-icons/lib";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { BsGrid3X3 } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Flex, FlexProps, Text } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";
import { CloseButton } from "../../components/ui/close-button";
import { IoMdSettings } from "react-icons/io";
import { FiStar } from "react-icons/fi";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../../components/ui/menu";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  to: string;
}

const LinkItems: Array<LinkItemProps> = [
  { to: "/dashboard", name: "Home", icon: HiHome },
  { to: "/dashboard/products", name: "Product", icon: HiOutlineViewColumns },
  { to: "/dashboard/categories", name: "Categories", icon: BsGrid3X3 },
  { to: "/dashboard/favourites", name: "Favorites", icon: FiStar },
  { to: "/", name: "Settings", icon: IoMdSettings },
];

const NavItem = ({ to, icon: IconBase, children, ...rest }: NavItemProps) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        w={"full"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.400",
        }}
        {...rest}
      >
        {IconBase && (
          <IconBase
            className="mr-2 size-5 text-current
          group-hover:text-white"
          />
        )}

        {children}
      </Flex>
    </NavLink>
  );
};

const DashBoardLayout: React.FC = () => {
  return (
    <>
      {/* Sidebar */}
      <div className="transition-all duration-500 fixed top-0 ">
        <Box
          transition="1s ease"
          bg={useColorModeValue("white", "gray.900")}
          borderRight="2px solid"
          borderRightColor={useColorModeValue("gray.200", "gray.700")}
          w={{ base: "full", md: 60 }}
          pos="fixed"
          h="full"
        >
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              Logo
            </Text>
            <CloseButton display={{ base: "flex", md: "none" }} />
          </Flex>

          <div
            className="flex flex-col mt-6 
          justify-between flex-1"
          >
            {LinkItems.map((item) => (
              <NavItem key={item.name} icon={item.icon} to={item.to}>
                {item.name}
              </NavItem>
            ))}

            <hr className="my-1 border-2" />
          </div>
        </Box>
      </div>

      {/* Main Content */}
      <MenuRoot positioning={{ placement: "bottom-start" }}>
        <Flex
          ml={{ base: 0, md: 60 }}
          px={{ base: 4, md: 4 }}
          height="20"
          alignItems="center"
          bg={useColorModeValue("white", "gray.900")}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue("gray.200", "gray.700")}
          justifyContent={{ base: "space-between", md: "flex-end" }}
        >
          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Logo
          </Text>

          <MenuTrigger asChild>
            <button >
              <Avatar
                name="Sage Adebayo"
                src="https://bit.ly/sage-adebayo"
                shape="rounded"
                size="lg"
              />
            </button>
          </MenuTrigger>

          <MenuContent mr={"5"}>
            <MenuItem value="new-txt">New Text File</MenuItem>
            <MenuItem value="new-file">New File...</MenuItem>
            <MenuItem value="new-win">New Window</MenuItem>
            <MenuItem value="open-file">Open File...</MenuItem>
          </MenuContent>
        </Flex>
      </MenuRoot>

      {/* Outlet Content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </>
  );
};

export default DashBoardLayout;
