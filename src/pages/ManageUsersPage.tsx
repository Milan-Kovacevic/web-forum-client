import ForumUsersTabContent from "@/components/manage-users/ForumUsersTabContent";
import RegistrationRequestsTabContent from "@/components/manage-users/RegistrationRequestsTabContent";
import SelectedUserDetailsCard from "@/components/manage-users/SelectedUserDetailsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadSingleForumUser } from "@/redux/users/userThunks";
import { AppRoutes } from "@/utils/constants";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageUsersPage() {
  const { selectedUser } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (selectedUser) {
      navigate(
        AppRoutes.MANAGE_SINGLE_USER.path.replace(":id", selectedUser.userId),
        { replace: true }
      );
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadSingleForumUser(id));
    }
  }, [id]);

  return (
    <div className="h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 flex-1 w-full flex flex-col my-2 h-full">
        <ManageUsersPageHeader />
        <div className="flex flex-1 lg:flex-row flex-col w-full gap-10 h-full">
          <Tabs
            defaultValue="users"
            className="flex-1 w-full flex flex-col items-start"
          >
            <TabsList className="w-auto flex flex-wrap items-start h-auto mb-2">
              <TabsTrigger value="users">Registered Users</TabsTrigger>
              <TabsTrigger value="requests">Registration Requests</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-full w-full flex-1 max-h-screen">
              <ForumUsersTabContent />
              <RegistrationRequestsTabContent />
            </ScrollArea>
          </Tabs>
          <SelectedUserDetailsCard />
        </div>
      </div>
    </div>
  );
}

const ManageUsersPageHeader = () => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="text-xl text-foreground font-semibold">
          Manage Web Forum Users
        </h2>
        <p className="text-muted-foreground text-sm">
          Approve and reject registration requests, manage user permissions and
          other.
        </p>
      </div>
      <Separator className="my-6 w-full" />
    </>
  );
};
