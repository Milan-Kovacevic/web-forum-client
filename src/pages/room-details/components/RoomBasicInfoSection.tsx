import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/utils/constants";
import { useAppSelector } from "@/hooks/useRedux";
import { formatDateDistance } from "@/utils/utility";

export default function RoomBasicInfoSection() {
  const { selectedRoom } = useAppSelector((state) => state.roomDetails);
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    navigate(AppRoutes.CHAT_ROOMS.path);
  };

  return (
    selectedRoom && (
      <div className="space-y-1 w-full mb-6 self-start">
        <div className="flex flex-wrap gap-3 items-center mb-2">
          <h2 className="text-xl text-foreground font-semibold">
            {selectedRoom.name}
          </h2>
          <div className="self-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    className="hover:bg-background px-3 h-8"
                    size="sm"
                    onClick={handleLeaveRoom}
                  >
                    <LogOutIcon className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click here to leave room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {!selectedRoom.description ? (
          <p className="text-sm text-accent-foreground/70 italic">
            No room description...
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            {selectedRoom.description}
          </p>
        )}

        <div className="flex-1 flex items-center gap-1 self-end">
          <span className="text-xs text-muted-foreground/75">Created:</span>
          <p className="text-xs font-semibold text-accent-foreground/80">
            {formatDateDistance(selectedRoom.dateCreated)}
          </p>
        </div>
      </div>
    )
  );
}
