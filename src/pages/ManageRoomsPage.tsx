import ChatRoomSelector from "@/components/manage-rooms/ChatRoomSelector";
import ManagingRoomPermissions from "@/components/manage-rooms/ManagingRoomPermissions";
import PostedCommentsTabContent from "@/components/manage-rooms/PostedCommentsTabContent";
import SelectedChatRoomHeader from "@/components/manage-rooms/SelectedChatRoomHeader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loadPostedRoomComments } from "@/redux/rooms/commentThunks";
import { getRoom, loadMyRoomPermissions } from "@/redux/rooms/roomsThunks";
import { AppRoutes } from "@/utils/constants";
import { LockIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ManageRoomsPage() {
  const { room } = useAppSelector((state) => state.singleRoom);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (room) {
      navigate(AppRoutes.MANAGE_SINGLE_ROOM.path.replace(":id", room.roomId));
    }
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getRoom(id));
      dispatch(loadPostedRoomComments(id));
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
            <ChatRoomSelector />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="h-full">
            {!room && (
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
              <ManagingRoomPermissions />

              <Tabs defaultValue="posted" className="flex-1 h-full">
                <TabsList className="w-auto flex md:inline-block h-auto">
                  <TabsTrigger value="posted">Posted Comments</TabsTrigger>
                  <TabsTrigger value="pending">Pending Comments</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-full flex flex-col gap-2">
                  <PostedCommentsTabContent value="posted" />
                  <TabsContent value="pending"></TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
