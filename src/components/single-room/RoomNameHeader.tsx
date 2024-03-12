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

export default function RoomNameHeader() {
  const { room } = useAppSelector((state) => state.singleRoom);
  const navigate = useNavigate();

  const handleLeaveRoom = () => {
    navigate(AppRoutes.CHAT_ROOMS.path);
  };

  return (
    <>
      {room && (
        <div className="space-y-1 w-full mb-6 self-start">
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <h2 className="text-xl text-foreground font-semibold">
              {room?.name}
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

          <p className="text-muted-foreground text-sm max-w-screen-lg">
            {room?.description}
          </p>
        </div>
      )}
    </>
  );
}
