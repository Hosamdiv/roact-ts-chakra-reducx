import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { useAppDispatch } from "../../App/store";
import { IProducts } from "../../interfaces";
import { BsTrash } from "react-icons/bs";
import { removeFromCart } from "../../App/features/CartSlice";
interface CartDrawerItemProps {
  cartItem: IProducts;
}

const CartDrawerItem = ({ cartItem }: CartDrawerItemProps) => {
  const { id, price, thumbnail, title, qty } = cartItem;
  const dispatch = useAppDispatch();
  return (
    <div className="border-b-4 my-2">
      <Flex  alignItems={"center"} mb={3} py={2}>
        <Image
          rounded={"full"}
          src={thumbnail}
          alt={title}
          w={"100px"}
          h={"100px"}
          objectFit={"cover"}
          mr={2}
          boxShadow="sm"
          _hover={{ boxShadow: "xl" }}
        />
        <Stack pl={5}>
          <Flex flex="1" spaceY={1} direction={"column"}>
            <Text fontSize={"sm"}>{title}</Text>
            <Text fontSize={"sm"}>Price: ${price}</Text>
            <Text fontSize={"sm"}>Quantity: {qty}</Text>
          </Flex>
          <Button
            variant="outline"
            size={"sm"}
            w={"fit-content"}
            border={"1px solid red"}
            color={"red.600"}
            _hover={{
              bg: "red.700",
              color: "white",
            }}
            onClick={() => dispatch(removeFromCart(id))}
          >
            <BsTrash />
            Remove
          </Button>
        </Stack>
      </Flex>
    </div>
  );
};

export default CartDrawerItem;
