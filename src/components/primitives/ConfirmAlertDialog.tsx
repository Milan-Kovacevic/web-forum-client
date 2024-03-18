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

type ConfirmAlertDialogProps = {
  isLoading: boolean;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  title?: string;
  subtitle?: string;
};

export default function ConfirmAlertDialog(props: ConfirmAlertDialogProps) {
  return (
    <AlertDialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.subtitle}</AlertDialogDescription>
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
