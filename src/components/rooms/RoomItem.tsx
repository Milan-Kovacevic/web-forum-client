import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type RoomItemProps = {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: string;
  read: boolean;
};

export default function RoomItem(item: RoomItemProps) {
  return (
    <div
      key={item.id}
      className="flex flex-col items-start gap-2 rounded-lg border py-4 px-4 text-left text-sm transition-colors hover:bg-muted"
    >
      <div className="flex w-full flex-row gap-3">
        <Avatar className="hidden sm:block text-sm w-12 h-12 rounded-full border border-muted-foreground">
          <AvatarImage src="https://githubb.com/shadcn.png" />
          <AvatarFallback>WFR</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-start justify-between w-full gap-1">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-base">{item.name}</div>
              {!item.read && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div className="ml-auto text-xs hidden sm:flex gap-3 items-center">
              <span className="text-muted-foreground">last commented</span>
              <Separator orientation="vertical" className="h-3" />
              <span className="text-foreground ">5 months ago</span>
            </div>
          </div>

          <div className="flex flex-row items-start justify-between w-full gap-1">
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.text.substring(0, 300)}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hover:bg-background"
                    size="sm"
                  >
                    <LogIn className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click here to join room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-start gap-2 mt-1 w-full">
        <Badge
          variant="outline"
          className="h-6 text-xs font-medium transition-none"
        >
          2 Moderators
        </Badge>
        <Badge
          variant="secondary"
          className="h-6 text-xs font-medium transition-none"
        >
          120 Comments
        </Badge>
      </div>
    </div>
  );
}
