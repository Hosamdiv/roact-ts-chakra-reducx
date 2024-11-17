import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../../App/features/globalSlice";
import { useAppDispatch } from "../../App/store";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "../../App/features/CartSlice";
import { Text } from "@chakra-ui/react";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  console.log(cartProducts);

  const onClose = () => dispatch(onCloseCartDrawerAction());
  return (
    <DrawerRoot open={isOpenCartDrawer} onOpenChange={onClose}>
      <DrawerBackdrop />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle fontSize={"2xl"}>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {cartProducts.length ? (
            cartProducts.map((item) => (
              <CartDrawerItem key={item.id} cartItem={item} />
            ))
          ) : (
            <Text fontSize={"lg"}>Your cart is empty</Text>
          )}
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button
              variant="outline"
              color={"red"}
              border={"2px solid red"}
              _hover={{
                bg: "red.900",
              }}
              onClick={() => dispatch(clearCart())}
            >
              Cancel All
            </Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CartDrawer;
