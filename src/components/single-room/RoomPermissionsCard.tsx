import { Card } from "@/components/ui/card";
import { useAppSelector } from "@/hooks/useRedux";
import { cn } from "@/lib/utils";
import ItemLoader from "@/components/primitives/ItemLoader";
import { PermissionDictionary } from "@/utils/constants";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RoomPermissionsProps = {
  className?: string;
};

export default function RoomPermissionsCard(props: RoomPermissionsProps) {
  const { loadingPermissions, permissions } = useAppSelector(
    (state) => state.singleRoom
  );
  const { identity } = useAppSelector((state) => state.identity);
  const role = identity?.roleName;
  const displayName = identity?.displayName;

  return (
    <Card className={cn("p-6 w-full mb-6 bg-muted/40", props.className)}>
      <div className="mb-4">
        <div className="self-end flex gap-2 items-center">
          <p className="sm:block hidden text-muted-foreground/90 text-xs">
            Role
          </p>
          <span>|</span>
          <p className="font-medium text-sm text-accent-foreground/80">
            {role}
          </p>
        </div>
        <div className="self-end flex gap-2 items-center">
          <p className="sm:block hidden text-muted-foreground/90 text-xs">
            Display Name
          </p>
          <span>|</span>
          <p className="font-medium text-sm text-accent-foreground/80">
            {displayName}
          </p>
        </div>
      </div>
      {loadingPermissions ? (
        <div className="h-[100px]">
          <ItemLoader />
        </div>
      ) : (
        <>
          {permissions.length > 0 ? (
            <div>
              <h3 className="text-accent-foreground font-normal text-sm mb-2">
                Your room permissions:
              </h3>

              <div className="flex flex-col gap-0.5 ml-2">
                {permissions.map((item) => (
                  <div
                    className="flex gap-2 items-center"
                    key={item.permissionId}
                  >
                    <span className="flex h-1.5 w-1.5 rounded-full bg-muted-foreground"></span>
                    <div className="flex gap-1 items-center">
                      <span className="font-medium text-accent-foreground/80 text-sm">
                        {PermissionDictionary[item.permissionId].name}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="cursor-help h-3.5 w-3.5 text-accent-foreground/80" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {
                                PermissionDictionary[item.permissionId]
                                  .description
                              }
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h3 className="text-accent-foreground/80 text-sm pb-6">
              You have no permission in this room...
            </h3>
          )}
        </>
      )}
    </Card>
  );
}
