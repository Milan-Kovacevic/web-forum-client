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
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { useAppDispatch } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import { changeUserAccountInfo } from "@/redux/users/userThunks";
import { setSelectedUser } from "@/redux/users/usersSlice";
import { ChangeUserAccountInput } from "@/types/inputs/user-inputs";
import { RoleType } from "@/types/models/application";
import { RegisteredUser } from "@/types/models/users";
import { AppRoutes, RoleDictionary, RoleIdResolver } from "@/utils/constants";
import {
  ChevronDownIcon,
  PencilIcon,
  SaveIcon,
  SearchIcon,
  UserIcon,
  UsersRoundIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ForumUserItemProps = {
  user: RegisteredUser;
  isSelected: boolean;
};

export default function ForumUserItem(props: ForumUserItemProps) {
  const [isEditing, setEditing] = useState(false);
  const [isUserEnabled, setUserEnabled] = useState(props.user.isEnabled);
  const userRole = RoleDictionary[props.user.roleId];
  const isRootAdmin = userRole.type === "RootAdmin";
  const [activeRole, setActiveRole] = useState<RoleType>(userRole.type);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditUser = () => {
    if (!isEditing) setEditing(true);
    else {
      var changeAccountInfoInput: ChangeUserAccountInput = {
        userId: props.user.userId,
      };
      if (isUserEnabled !== props.user.isEnabled) {
        changeAccountInfoInput.isEnabled = isUserEnabled;
      }
      if (activeRole !== userRole.type) {
        changeAccountInfoInput.role = RoleIdResolver[activeRole];
      }
      dispatch(setSelectedUser(props.user));
      dispatch(changeUserAccountInfo(changeAccountInfoInput));
      setEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setUserEnabled(props.user.isEnabled);
    setActiveRole(userRole.type);
  };

  const handleUserSelected = () => {
    navigate(
      AppRoutes.MANAGE_SINGLE_USER.path.replace(":id", props.user.userId)
    );
  };

  return (
    <Card
      className={cn(
        "flex flex-col w-full gap-2 p-4 px-5 shadow-md",
        props.isSelected ? "dark:bg-accent/60 bg-accent/30 border-primary" : ""
      )}
    >
      <div className="flex flex-row items-center flex-wrap gap-3 w-full">
        <Avatar className="h-12 w-12">
          <AvatarFallback>
            <UserIcon className="text-accent-foreground h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-row flex-wrap flex-1 gap-1">
          <div className="flex-1">
            <div className="flex flex-row items-center gap-1">
              <p className="font-medium mb-0.5">{props.user.displayName}</p>
              {!isRootAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditUser}
                  className="h-7 px-2.5 self-start"
                >
                  {isEditing ? (
                    <SaveIcon className="h-3.5 w-3.5 text-primary animate-pulse" />
                  ) : (
                    <PencilIcon className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}

              {isEditing && !isRootAdmin && (
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
                  variant={isUserEnabled ? "secondary" : "outline"}
                  className="font-normal h-6 px-2.5"
                >
                  Status:{" "}
                  <span className="ml-1 font-medium">
                    {isUserEnabled ? "Enabled" : "Disabled"}
                  </span>
                </Badge>
              ) : (
                <Toggle
                  pressed={isUserEnabled}
                  onClick={() => setUserEnabled(!isUserEnabled)}
                  size="sm"
                  className="rounded-xl h-6 text-xs px-2.5"
                  variant="outline"
                >
                  {isUserEnabled ? "User enabled" : "User disabled"}
                </Toggle>
              )}
            </div>
          </div>

          {!isEditing && !isRootAdmin && (
            <div className="mr-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-8"
                onClick={handleUserSelected}
              >
                <SearchIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center self-start rounded-md bg-secondary text-secondary-foreground w-auto h-7">
            <div className="px-3 shadow-none flex flex-row items-center gap-2">
              <UsersRoundIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">
                {RoleDictionary[RoleIdResolver[activeRole]].name}
              </span>
            </div>
            {isEditing && (
              <>
                <Separator orientation="vertical" className="h-[20px]" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      disabled={userRole.type == "RootAdmin"}
                      variant="secondary"
                      className="px-2 shadow-none h-6"
                    >
                      {userRole.type == "RootAdmin" ? (
                        <XIcon className="h-3.5 w-3.5 text-secondary-foreground" />
                      ) : (
                        <ChevronDownIcon className="h-3.5 w-3.5 text-secondary-foreground" />
                      )}
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
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setActiveRole(
                          RoleDictionary[RoleIdResolver["Regular"]].type
                        )
                      }
                      checked={activeRole === "Regular"}
                    >
                      {RoleDictionary[1].name}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setActiveRole(
                          RoleDictionary[RoleIdResolver["Moderator"]].type
                        )
                      }
                      checked={activeRole === "Moderator"}
                    >
                      {RoleDictionary[2].name}
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        setActiveRole(
                          RoleDictionary[RoleIdResolver["Admin"]].type
                        )
                      }
                      checked={activeRole === "Admin"}
                    >
                      {RoleDictionary[3].name}
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
}
