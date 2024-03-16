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

        <div className="flex md:flex-row flex-col w-full gap-5 h-screen">
          <RegistrationRequestsSection />
          <div className="w-full">
            {/* <Card>
              <CardContent className="py-3 px-4 flex flex-col gap-2">
                <div className="flex flex-row gap-3 items-center">
                  <p className="text-sm font-medium leading-none text-accent-foreground mb-0.5">
                    @marko_m
                  </p>
                  <Badge variant="outline" className="font-medium">
                    Enabled
                  </Badge>
                </div>

                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        <UserIcon className="text-accent-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex flex-row items-center gap-1">
                        <p className="text-sm font-medium leading-none">
                          Marko Markovic
                        </p>
                        <span className="text-xs">|</span>
                        <p className="text-xs font-normal leading-none">
                          Regular User
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        marko@mail.com
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary">
                    <Settings className="h-4 w-4 text-accent-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}
