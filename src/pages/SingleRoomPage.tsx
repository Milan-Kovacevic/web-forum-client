import DiscoverRooms from "@/components/single-room/DIscoverRooms";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/hooks/useRedux";
import { AppRoutes } from "@/utils/constants";
import {
  CircleUserIcon,
  LogOutIcon,
  MessageCircleHeartIcon,
  SendIcon,
  UserRoundIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SingleRoomPage() {
  const { selectedRoom } = useAppSelector((state) => state.rooms);

  const navigate = useNavigate();
  const handleLeaveRoom = () => {
    navigate(AppRoutes.CHAT_ROOMS.path);
  };

  return (
    <div className="md:h-full w-full flex max-w-screen-2xl p-8 mx-auto">
      <div className="px-6 md:flex-1 my-2 flex lg:flex-row flex-col xl:gap-10 lg:gap-6 gap-4">
        <div className="h-auto lg:w-96 w-full">
          <div className="space-y-1 w-full mb-8 self-start">
            <div className="flex flex-wrap gap-3 items-center mb-2">
              <h2 className="text-2xl text-foreground font-semibold">
                {selectedRoom?.name}
              </h2>
              <div className="self-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        className="hover:bg-background p-3 h-8"
                        size="sm"
                        onClick={handleLeaveRoom}
                      >
                        <LogOutIcon className="w-5 h-5" />
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
              {selectedRoom?.description}
            </p>
          </div>
          <Card className="p-6 w-full mb-6 bg-muted/20 lg:w-full md:w-2/3">
            <div className="mb-4">
              <div className="self-end flex gap-2 items-center">
                <p className="sm:block hidden text-muted-foreground/90 text-xs">
                  Role
                </p>
                <span>|</span>
                <p className="font-medium text-sm text-accent-foreground/80">
                  Regular User
                </p>
              </div>
              <div className="self-end flex gap-2 items-center">
                <p className="sm:block hidden text-muted-foreground/90 text-xs">
                  Display Name
                </p>
                <span>|</span>
                <p className="font-medium text-sm text-accent-foreground/80">
                  Milan Kovacevic
                </p>
              </div>
            </div>

            <h3 className="text-accent-foreground font-normal text-sm mb-2">
              Your room permissions:
            </h3>
            <div className="flex flex-col gap-0 ml-2">
              <div className="flex gap-2 items-center">
                <span className="flex h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                <span className="font-medium text-accent-foreground/80 text-sm">
                  Read
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="flex h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                <span className="font-medium text-accent-foreground/80 text-sm">
                  Create
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="flex h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                <span className="font-medium text-accent-foreground/80 text-sm">
                  Edit
                </span>
              </div>
            </div>
          </Card>
          <div className="w-full lg:w-full md:w-2/3">
            <div className="flex gap-1.5 items-center mb-3 ml-1">
              <MessageCircleHeartIcon className="w-5 h-5 opacity-90" />
              <p className="font-medium text-base sm:text-lg">
                Discover Other Rooms
              </p>
            </div>

            <DiscoverRooms />
          </div>
        </div>

        <div className="w-full px-3 lg:mt-0 mt-6">
          <h3 className="text-accent-foreground text-2xl font-semibold ml-4 mb-4">
            Room Comments
          </h3>
          <div className="flex flex-col w-full gap-4">
            <div className="flex sm:flex-row flex-col items-center gap-2">
              <Textarea
                maxLength={400}
                className="pl-5 py-3 bg-card shadow-md max-h-24 rounded-xl flex-1 resize-none"
                placeholder="Write your comment..."
              />
              <Button
                size="sm"
                variant="default"
                className="self-end shadow-md"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-screen sm:p-4">
              <div className="grid grid-cols-1 gap-5 sm:px-2 h-full sm:mt-0 mt-2">
                <div className="flex gap-3 items-stretch w-full">
                  <div className="mr-auto flex gap-2 xl:basis-2/3 md:basis-5/6 w-full">
                    <Avatar className="sm:block hidden text-sm ml-1 mt-1 w-11 h-11 rounded-full border shadow-md border-border dark:border-none">
                      <AvatarFallback className="dark:bg-muted/50 bg-background/80">
                        {/* <span className="text-secondary-foreground">NP</span> */}
                        <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="py-3 px-5 h-auto min-h-16 w-full shadow-md dark:bg-muted/30 border-border">
                      <p className="text-card-foreground text-sm">
                        Hello this is a mock comment for a discussion. Hello
                        this is a mock comment for a discussion.Hello this is a
                        mock comment for a discussion. Hello this is a mock
                        comment for a discussion. Hello this is a mock comment
                      </p>
                    </Card>
                  </div>
                </div>
                <div className="flex gap-3 items-stretch w-full">
                  <div className="ml-auto flex gap-1 xl:basis-2/3 md:basis-5/6 w-full">
                    <Card className="p-4 h-auto min-h-16 max-h-28 w-full shadow-md dark:bg-accent/60 bg-accent border-secondary dark:border-primary">
                      <p className="text-card-foreground text-sm">
                        Hello this is a mock comment for a discussion.
                      </p>
                    </Card>
                    <Avatar className="sm:block hidden text-sm ml-1 mt-1 w-11 h-11 rounded-full border shadow-md dark:border-none">
                      <AvatarFallback className="bg-secondary">
                        {/* <span className="text-secondary-foreground">NP</span> */}
                        <UserRoundIcon className="text-secondary-foreground h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
