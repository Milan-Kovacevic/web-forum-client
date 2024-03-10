import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LogInIcon } from "lucide-react";

type JoinRoomButtonProps = {
  className?: string;
  onRoomJoinClicked: () => void;
};

export default function JoinRoomButton(props: JoinRoomButtonProps) {
  return (
    <div className={cn("block", props.className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-background"
              size="sm"
              onClick={props.onRoomJoinClicked}
            >
              <LogInIcon className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click here to join room</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
