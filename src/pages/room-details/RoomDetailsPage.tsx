import ChatRoomsListBrowser from "@/pages/room-details/components/ChatRoomsListBrowser";
import CommentInputTextarea from "@/pages/room-details/components/CommentInputTextarea";
import RoomComments from "@/pages/room-details/components/RoomCommentsSection";
import RoomBasicInfoSection from "@/pages/room-details/components/RoomBasicInfoSection";
import RoomPermissionsCard from "@/pages/room-details/components/RoomPermissionsCard";
import { useAppDispatch } from "@/hooks/useRedux";
import { getUserCommentsForRoom } from "@/redux/rooms/commentThunks";
import { getMyRoomPermissions } from "@/redux/rooms/roomThunks";
import { getRoom } from "@/redux/rooms/roomThunks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RoomDetailsPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getRoom(id));
      dispatch(getUserCommentsForRoom(id));
      dispatch(getMyRoomPermissions(id));
    }
  }, [id]);

  return (
    <div className="md:h-full w-full flex max-w-screen-2xl sm:p-8 py-4 px-2 mx-auto">
      <div className="px-6 md:flex-1 my-2 flex lg:flex-row flex-col xl:gap-10 lg:gap-6 gap-4 w-full">
        <div className="h-auto lg:w-96 w-full">
          <RoomBasicInfoSection />
          <RoomPermissionsCard className="w-full lg:w-full md:w-2/3" />
          <ChatRoomsListBrowser className="w-full lg:w-full md:w-2/3" />
        </div>

        <div className="w-full lg:px-8 sm:px-4 lg:mt-0 mt-6">
          <h3 className="text-accent-foreground text-xl font-semibold ml-4 mb-3">
            Room Comments
          </h3>
          <div className="flex flex-col w-full gap-4">
            <CommentInputTextarea />
            <RoomComments />
          </div>
        </div>
      </div>
    </div>
  );
}
