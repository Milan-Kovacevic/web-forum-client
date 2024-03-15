import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PermissionDictionary } from "@/utils/constants";
import { useAppSelector } from "@/hooks/useRedux";
import { RoomPermission } from "@/types/models/rooms";
import ItemLoader from "@/components/primitives/ItemLoader";
import { Badge } from "../ui/badge";

export default function RoomPermissionBadges() {
  const { roomPermissions, loadingRoomPermissions } = useAppSelector(
    (state) => state.manageRoom
  );

  return (
    <div className="mb-5">
      {(loadingRoomPermissions ||
        (!loadingRoomPermissions && roomPermissions.length) > 0) && (
        <p className="text-accent-foreground/90 text-sm mb-1.5 ml-0.5">
          Your permissions:{" "}
        </p>
      )}
      {loadingRoomPermissions ? (
        <div className="h-[50px]">
          <ItemLoader className="justify-start ml-4" />
        </div>
      ) : (
        <div className="flex flex-row gap-1 flex-wrap">
          {roomPermissions.length > 0 ? (
            roomPermissions.map((item) => (
              <RoomPermissionBadge key={item.permissionId} {...item} />
            ))
          ) : (
            <EmptyPermissionsPlaceholder />
          )}
        </div>
      )}
    </div>
  );
}

const EmptyPermissionsPlaceholder = () => {
  return (
    <h3 className="text-accent-foreground/80 text-sm pb-2">
      You have no permission in this room...
    </h3>
  );
};

const RoomPermissionBadge = (item: RoomPermission) => {
  const permission = PermissionDictionary[item.permissionId];

  return (
    <Badge variant="secondary" className="w-auto">
      <div className="flex gap-1 items-center justify-center">
        <span className="font-medium text-accent-foreground/80 text-xs">
          {permission.name}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="cursor-help h-3.5 w-3.5 mt-0.5 text-accent-foreground/80" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-normal">{permission.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Badge>
  );
};
