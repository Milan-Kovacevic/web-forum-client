import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadForumUsers } from "@/redux/users/userThunks";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ForumUserItem from "@/components/manage-users/ForumUserItem";
import { clearEditedUser } from "@/redux/users/usersSlice";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ForumUsersTabContent() {
  const { registeredUsers, loadingUsers, editedUser, selectedUser } =
    useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadForumUsers());
  }, []);

  useEffect(() => {
    if (editedUser) {
      dispatch(loadForumUsers());
      dispatch(clearEditedUser());
    }
  }, [editedUser]);

  return (
    <TabsContent value="users" className="h-full w-full px-1">
      <div className="relative w-auto flex max-w-md mb-3">
        <SearchIcon
          size="sm"
          className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground"
        />
        <Input placeholder="Search..." className="pl-8" />
      </div>
      <div className="flex flex-col gap-2 ">
        {loadingUsers ? (
          <ForumUsersListPlaceholder />
        ) : (
          registeredUsers.map((item) => (
            <ForumUserItem
              key={item.userId}
              user={item}
              isSelected={selectedUser?.userId === item.userId}
            />
          ))
        )}
      </div>
    </TabsContent>
  );
}

const ForumUsersListPlaceholder = () => {
  const numOfItems = 10;
  const loadingItems = Array.from({ length: numOfItems }, (_, index) => index);

  return (
    <div className="flex flex-col gap-2">
      {loadingItems.map((item) => (
        <div
          key={item}
          className="flex flex-row justify-end gap-2 w-full border rounded-lg py-4 px-4 transition-colors"
        >
          <Skeleton className="h-12 w-14 rounded-full" />
          <div className="flex flex-row w-full">
            <div className="flex flex-col gap-2 w-full mt-1">
              <div className="flex flex-row gap-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/12" />
              </div>

              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="self-start w-1/3 flex flex-row gap-1">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
