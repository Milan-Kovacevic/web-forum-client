import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { MainRouteItems } from "@/utils/constants";

type ReturnToMenuButtonProps = {
  className: string;
};

export default function ReturnToMenuButton(props: ReturnToMenuButtonProps) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(MainRouteItems.CHAT_ROOMS.path);
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            variant="link"
            className={cn(
              "text-accent dark:text-accent-foreground",
              props.className
            )}
          >
            <HomeIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go to main menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
