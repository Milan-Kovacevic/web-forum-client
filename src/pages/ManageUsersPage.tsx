import ForumUsersTabContent from "@/components/manage-users/ForumUsersTabContent";
import RegistrationRequestsTabContent from "@/components/manage-users/RegistrationRequestsTabContent";
import SelectedUserDetailsCard from "@/components/manage-users/SelectedUserDetailsCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageUsersPage() {
  return (
    <div className="h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 flex-1 my-2 h-full">
        <div className="space-y-1">
          <h2 className="text-xl text-foreground font-semibold">
            Manage Web Forum Users
          </h2>
          <p className="text-muted-foreground text-sm">
            Approve and reject registration requests, manage user permissions
            and other.
          </p>
        </div>
        <Separator className="my-6 w-full" />

        <div className="flex md:flex-row flex-col w-full gap-10 h-auto">
          <Tabs
            defaultValue="users"
            className="max-h-screen h-auto w-full flex flex-col items-start"
          >
            <TabsList className="w-auto h-auto mb-2">
              <TabsTrigger value="users">Forum Users</TabsTrigger>
              <TabsTrigger value="requests">Registration Requests</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-full w-full">
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
