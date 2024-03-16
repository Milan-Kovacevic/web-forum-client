import ForumUsersSection from "@/components/manage-users/forum-users/ForumUsersSection";
import RegistrationRequestsSection from "@/components/manage-users/registration-requests/RegistrationRequestsSection";
import { Separator } from "@/components/ui/separator";

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

        <div className="flex md:flex-row flex-col w-full gap-5 h-full">
          <ForumUsersSection />
          <RegistrationRequestsSection />
        </div>
      </div>
    </div>
  );
}
