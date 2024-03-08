import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon, PencilIcon } from "lucide-react";
import SubmitRoomDialog from "@/components/rooms/SubmitRoomDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ManageRoomPopupProps = {
  onRoomRemove: () => void;
  isDialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
};

export default function ManageRoomPopup(props: ManageRoomPopupProps) {
  return (
    <div className="self-end block">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontalIcon className="h-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-5">
          <div className="grid gap-4">
            <h4 className="font-semibold leading-none text-sm mb-1">
              Manage chat room
            </h4>
            <div className="space-x-2">
              <SubmitRoomDialog
                isDialogOpen={props.isDialogOpen}
                onDialogOpenChange={props.setDialogOpen}
                onSaveChanges={(_) => {}}
              >
                <Button size="sm" variant="secondary">
                  <PencilIcon className="h-4" />
                  <span className="font-medium mx-1">Edit</span>
                </Button>
              </SubmitRoomDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <PencilIcon className="h-4" />
                    <span className="font-medium mx-1">Remove</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      selected chat room and all comments in it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="mt-3">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={props.onRoomRemove}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
