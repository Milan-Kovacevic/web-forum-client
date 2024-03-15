import ChatRoomSelectList from "@/components/manage-rooms/ChatRoomSelectList";
import RoomPermissionBadges from "@/components/manage-rooms/RoomPermissionBadges";
import PendingCommentsTabContent from "@/components/manage-rooms/PendingCommentsTabContent";
import PostedCommentsTabContent from "@/components/manage-rooms/PostedCommentsTabContent";
import SelectedChatRoomHeader from "@/components/manage-rooms/SelectedChatRoomHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  loadPendingRoomComments,
  loadPostedRoomComments,
} from "@/redux/rooms/commentThunks";
import {
  loadManagedRoom,
  loadMyRoomPermissions,
} from "@/redux/rooms/roomsThunks";
import { AppRoutes } from "@/utils/constants";
import { LockIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageRoomsPage() {
  const { managedRoom } = useAppSelector((state) => state.manageRoom);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (managedRoom) {
      navigate(
        AppRoutes.MANAGE_SINGLE_ROOM.path.replace(":id", managedRoom.roomId),
        { replace: true }
      );
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(loadManagedRoom(id));
      dispatch(loadPostedRoomComments(id));
      dispatch(loadPendingRoomComments(id));
      dispatch(loadMyRoomPermissions(id));
    }
  }, [id]);

  return (
    <div className="h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 flex-1 my-2 h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="w-full dark:shadow-sm shadow-lg dark:shadow-accent rounded-lg border border-border h-screen"
          style={{ height: undefined }} // reset of radix style
        >
          <ResizablePanel className="max-w-xl md:min-w-72" defaultSize={25}>
            <ChatRoomSelectList />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="h-full">
            {!managedRoom && (
              <div className="z-10 w-full h-full flex justify-center dark:bg-muted/15 bg-muted/30">
                <div className="flex flex-col gap-0.5 w-full justify-center items-center text-muted-foreground/75">
                  <LockIcon className="w-7 h-7" />
                  <p className="text-base text-center">
                    Please, select the chat room first...
                  </p>
                </div>
              </div>
            )}
            <div className="py-6 px-8 flex flex-col h-full">
              <SelectedChatRoomHeader />
              <RoomPermissionBadges />
              <Tabs defaultValue="posted" className="flex-1 h-full">
                <TabsList className="w-auto flex md:inline-block h-auto">
                  <TabsTrigger value="posted">Posted Comments</TabsTrigger>
                  <TabsTrigger value="pending">Pending Comments</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-full flex flex-col gap-2">
                  <PostedCommentsTabContent value="posted" />
                  <PendingCommentsTabContent value="pending" />
                </ScrollArea>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
