import { Card } from "@/components/ui/card";
import UserDetailsRoomSelector from "./UserDetailsRoomSelector";
import UserRoomPermissionsList from "./UserRoomPermissionsList";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { LockIcon } from "lucide-react";
import { RoleDictionary } from "@/utils/constants";
import ItemLoader from "../primitives/ItemLoader";
import { useEffect } from "react";
import { loadSingleForumUser } from "@/redux/users/userThunks";
import { setSelectedUser } from "@/redux/users/usersSlice";

export default function SelectedUserDetailsCard() {
  const { selectedUser, editedUser } = useAppSelector((state) => state.users);
  const { managedUser, loadingManagedUser } = useAppSelector(
    (state) => state.manageUser
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      editedUser &&
      selectedUser !== null &&
      managedUser !== null &&
      selectedUser.userId === managedUser.userId
    ) {
      dispatch(loadSingleForumUser(selectedUser?.userId));
      dispatch(setSelectedUser(null));
    }
  }, [editedUser]);

  return (
    <Card className="w-full h-min flex-1 shadow-md dark:bg-muted/30">
      {loadingManagedUser ? (
        <UserDetailsCardLoader />
      ) : managedUser == null ? (
        <UserNotSelectedPlaceholder />
      ) : (
        <div className="p-8 flex flex-col gap-2 min-h-96">
          <UserDetailsCardHeader />
          <UserDetailsRoomSelector />
          <UserRoomPermissionsList />
        </div>
      )}
    </Card>
  );
}

const UserDetailsCardLoader = () => (
  <div className="h-96 flex justify-center items-center">
    <ItemLoader className="justify-start ml-4" />
  </div>
);

const UserNotSelectedPlaceholder = () => (
  <div className="z-10 w-full h-[400px] flex justify-center dark:bg-muted/5 bg-muted/10">
    <div className="flex flex-col gap-0.5 w-full justify-center items-center text-muted-foreground/75">
      <LockIcon className="w-7 h-7" />
      <p className="text-sm text-center">
        Please, select the user to show his permissions...
      </p>
    </div>
  </div>
);

const UserDetailsCardHeader = () => {
  const { managedUser } = useAppSelector((state) => state.manageUser);
  const userRole = RoleDictionary[managedUser?.roleId ?? 0].name;

  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-accent-foreground sm:text-base text-sm">
          {managedUser?.displayName}
        </p>
        <Separator orientation="vertical" className="h-5" />
        <p className="text-muted-foreground sm:text-sm text-xs">{userRole}</p>
      </div>
      <Badge
        variant={managedUser?.isEnabled ? "secondary" : "outline"}
        className="font-normal h-6 px-2.5 w-auto self-start text-xs"
      >
        <span className="ml-1 font-medium">
          {managedUser?.isEnabled ? "Enabled" : "Disabled"}
        </span>
      </Badge>
    </div>
  );
};
