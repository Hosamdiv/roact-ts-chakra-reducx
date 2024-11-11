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

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);

  const onClose = () => dispatch(onCloseCartDrawerAction());
  return (
    <DrawerRoot open={isOpenCartDrawer} onOpenChange={onClose}>
      <DrawerBackdrop />
   
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerActionTrigger asChild>
            <Button variant="outline" color={"red"} >Cancel</Button>
          </DrawerActionTrigger>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default CartDrawer;
