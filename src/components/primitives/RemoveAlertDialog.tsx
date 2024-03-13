import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Icons } from "./Icons";

type RemoveAlertDialogProps = {
  isLoading: boolean;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
};

export default function RemoveAlertDialog(props: RemoveAlertDialogProps) {
  return (
    <AlertDialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete selected
            chat room and all comments in it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={props.isLoading}
            onClick={props.onConfirm}
            variant="default"
            size="sm"
            type="submit"
          >
            {props.isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
