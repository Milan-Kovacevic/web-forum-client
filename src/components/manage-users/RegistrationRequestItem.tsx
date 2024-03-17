import ConfirmAlertDialog from "@/components/primitives/ConfirmAlertDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks/useRedux";
import { RegistrationRequest } from "@/types/models/users";
import { formatDateDistance } from "@/utils/utility";
import { CheckIcon, UserIcon, XIcon } from "lucide-react";
import { useState } from "react";

type RegistrationRequestItemProps = {
  request: RegistrationRequest;
  onRequestProcessed: (requestId: string, isAccepted: boolean) => void;
};

export default function RegistrationRequestItem(
  props: RegistrationRequestItemProps
) {
  const { loadingRequestDialog } = useAppSelector((state) => state.requests);
  const [showAcceptDialog, setShowAcceptDialog] = useState<boolean>(false);
  const [showBlockDialog, setShowBlockDialog] = useState<boolean>(false);

  const handleAcceptRequest = () => {
    setShowAcceptDialog(false);
    props.onRequestProcessed(props.request.requestId, true);
  };
  const handleBlockRequest = () => {
    setShowBlockDialog(false);
    props.onRequestProcessed(props.request.requestId, false);
  };

  return (
    <Card
      key={props.request.requestId}
      className="py-3 px-4 flex flex-col gap-2 hover:border-primary w-full shadow-md"
    >
      <div className="flex-1 flex flex-row gap-3.5 w-full">
        <div className="flex flex-col flex-wrap items-center gap-1">
          <Avatar className="h-12 w-12">
            <AvatarFallback>
              <UserIcon className="text-accent-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-row gap-3 items-center line-clamp-1 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-xs font-medium leading-none text-center text-accent-foreground mb-0.5 w-28 text-wrap">
                    @{props.request.username}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Username: {props.request.username}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex-1 self-stretch flex flex-wrap items-center justify-between gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-xs">
              {formatDateDistance(props.request.submitDate)}
            </p>
            <div className="flex flex-col flex-wrap mb-auto gap-0.5">
              <p className="text-base font-medium leading-none">
                {props.request.userDisplayName}
              </p>
              <p className="text-xs flex text-muted-foreground">
                {props.request.userEmail ?? "No email..."}
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center mr-1 sm:mt-0 mt-4">
            <ConfirmAlertDialog
              isLoading={loadingRequestDialog}
              isOpen={showAcceptDialog}
              onOpenChange={setShowAcceptDialog}
              onConfirm={handleAcceptRequest}
              title="Are you absolutely sure?"
              subtitle="This action will accept/approve selected request."
            >
              <Button size="sm" variant="ghost">
                <CheckIcon className="h-4 w-4 text-accent-foreground" />
              </Button>
            </ConfirmAlertDialog>

            <ConfirmAlertDialog
              isLoading={loadingRequestDialog}
              isOpen={showBlockDialog}
              onOpenChange={setShowBlockDialog}
              onConfirm={handleBlockRequest}
              title="Are you absolutely sure?"
              subtitle="This action will block/reject selected request."
            >
              <Button size="sm" variant="ghost">
                <XIcon className="h-4 w-4 text-accent-foreground" />
              </Button>
            </ConfirmAlertDialog>
          </div>
        </div>
      </div>
    </Card>
  );
}
