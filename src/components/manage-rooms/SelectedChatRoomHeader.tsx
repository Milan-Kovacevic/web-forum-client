import { useAppSelector } from "@/hooks/useRedux";
import { Separator } from "@/components/ui/separator";

export default function SelectedChatRoomHeader() {
  const { managedRoom } = useAppSelector((state) => state.manageRoom);

  return (
    <>
      {managedRoom && (
        <>
          <div className="space-y-0.5 flex flex-col">
            <h2 className="text-lg text-foreground font-semibold">
              {managedRoom?.name}
            </h2>
            {!managedRoom?.description ? (
              <p className="text-sm text-accent-foreground/70 italic">
                No room description...
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                {managedRoom?.description}
              </p>
            )}
          </div>
          <Separator orientation="horizontal" className="my-4" />
        </>
      )}
    </>
  );
}
