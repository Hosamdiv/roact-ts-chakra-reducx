import { HiHome } from "react-icons/hi";
import { Avatar } from "../components/ui/avatar";
import { IconType } from "react-icons/lib";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { BsGrid3X3 } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { NavLink as routerLink } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";
import { CloseButton } from "../components/ui/close-button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";

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
];

const NavItem = ({ to, icon: IconBase, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={routerLink}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        w={"full"}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        // border={"1px solid"}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {IconBase && (
          <IconBase className="mr-2 size-5 text-current group-hover:text-white" />
        )}

        {children}
      </Flex>
    </Link>
  );
};

const DashBoardLayout: React.FC = () => {
  return (
    <>
      <div className="transition-all duration-500 fixed top-0 ">
        <Box
          transition="1s ease"
          bg={useColorModeValue("white", "gray.900")}
          borderRight="1px solid red"
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

          <div className="flex flex-col mt-6 justify-between flex-1">
            {LinkItems.map((item) => (
              <NavItem key={item.name} icon={item.icon} to={item.to}>
                {item.name}
              </NavItem>
            ))}

            <hr className="my-1 border-2" />
          </div>
        </Box>
      </div>

      <MenuRoot 
      positioning={{ placement: "right-start" }}
      >
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
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={() => {}}
            variant="outline"
            aria-label="open menu"
          >
            <HiHome />
          </IconButton>

          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Logo
          </Text>

          {/* <HStack spaceX={{ base: "0", md: "6" }}> */}
            {/* <IconButton size="lg" variant="ghost" aria-label="open menu">
              <HiHome />
            </IconButton> */}
            {/* <Flex alignItems={"center"}> */}
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
       
                </MenuContent>
              </MenuRoot>
            {/* </Flex> */}
          {/* </HStack> */}
        </Flex>
      </MenuRoot>
      <Outlet />
    </>
  );
};

export default DashBoardLayout;
