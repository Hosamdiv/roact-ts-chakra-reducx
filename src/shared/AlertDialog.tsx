import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { FaRegTrashCan } from "react-icons/fa6";

interface DeleteDialogProps {
  title: string;
  onConfirm: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

const AlertDialog: React.FC<DeleteDialogProps> = ({
  title,
  onConfirm,
  isLoading,
  isSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <DialogRoot open={isOpen} onOpenChange={() => setIsOpen} role="alertdialog">
      <DialogTrigger asChild>
        <Button
          _hover={{ bg: "red.600" }}
          bg={"red.400"}
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          <FaRegTrashCan />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our systems.
            <b> {title}</b>
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            bg={"red.400"}
            _hover={{ bg: "red.600" }}
            onClick={onConfirm}
            loading={isLoading}
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default AlertDialog;
