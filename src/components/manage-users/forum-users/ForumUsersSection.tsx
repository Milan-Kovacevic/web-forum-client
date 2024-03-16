import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  ChevronDownIcon,
  CircleIcon,
  InfoIcon,
  PencilIcon,
  SaveIcon,
  SearchIcon,
  UserIcon,
  UsersRoundIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

export default function ForumUsersSection() {
  return (
    <section className="w-full">
      <div className="mb-3 ml-1 flex flex-row items-center gap-1.5">
        <CircleIcon className="h-3 w-3" />
        <h2 className="text-base font-medium text-accent-foreground">
          Forum Users
        </h2>
      </div>
      <ScrollArea className="flex flex-col h-full w-full max-h-screen">
        <div className="flex flex-col gap-3 px-2">
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
          <ForumUserItem />
        </div>
      </ScrollArea>
    </section>
  );
}

const ForumUserItem = () => {
  const [isEditing, setEditing] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const handleEditUser = () => {
    setEditing(!isEditing);
  };
  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <Card className="flex flex-col w-full gap-2 p-4 shadow-md hover:border-primary">
      <div className="flex flex-row items-center flex-wrap gap-3 w-full">
        <Avatar className="h-12 w-12">
          <AvatarFallback>
            <UserIcon className="text-accent-foreground h-6 w-6 hover:scale-110 hover:cursor-pointer transition-all" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-row flex-1">
          <div className="flex-1">
            <div className="flex flex-row items-center gap-1">
              <p className="font-medium mb-0.5">Marko Markovic</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditUser}
                className="h-7 px-2.5"
              >
                {isEditing ? (
                  <SaveIcon className="h-3.5 w-3.5 text-primary animate-pulse" />
                ) : (
                  <PencilIcon className="h-3.5 w-3.5" />
                )}
              </Button>
              {isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-accent-foreground px-2"
                  onClick={handleCancelEdit}
                >
                  <XIcon className="text-accent-foreground h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="w-auto">
              {!isEditing ? (
                <Badge
                  variant={isEnabled ? "secondary" : "outline"}
                  className="font-normal h-6 px-2.5"
                >
                  Status:{" "}
                  <span className="ml-1 font-medium">
                    {isEnabled ? "Enabled" : "Not Enabled"}
                  </span>
                </Badge>
              ) : (
                <Toggle
                  pressed={isEnabled}
                  onClick={() => setEnabled(!isEnabled)}
                  size="sm"
                  className="rounded-xl h-6 text-xs px-2.5"
                  variant="outline"
                >
                  {isEnabled ? "User enabled" : "User not enabled"}
                </Toggle>
              )}
            </div>
          </div>

          {!isEditing && (
            <div className="mr-1">
              <Button size="sm" variant="ghost" className="h-8">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center self-start rounded-md bg-secondary text-secondary-foreground w-auto h-8">
            <div className="px-3 shadow-none flex flex-row items-center gap-2">
              <UsersRoundIcon className="h-4 w-4" />
              <span className="text-xs font-medium">Regular</span>
            </div>
            {isEditing && (
              <>
                <Separator orientation="vertical" className="h-[20px]" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="px-2 shadow-none h-6"
                    >
                      <ChevronDownIcon className="h-3.5 w-3.5 text-secondary-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    alignOffset={-5}
                    className="w-[200px]"
                    forceMount
                  >
                    <DropdownMenuLabel>User Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Regular
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Moderator
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Administrator
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
