import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

type CustomErrorIconProps = {
  className: string;
  body: any;
};

export default function CustomErrorIcon(props: CustomErrorIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon
            className={cn(
              "text-sm font-medium text-destructive h-4 w-4",
              props.className
            )}
          />
        </TooltipTrigger>
        <TooltipContent className="text-wrap max-w-72 z-50">
          <p>{props.body}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
