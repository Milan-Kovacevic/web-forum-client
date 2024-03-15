import { useAppSelector } from "@/hooks/useRedux";
import { Separator } from "@/components/ui/separator";

export default function SelectedChatRoomHeader() {
  const { room } = useAppSelector((state) => state.singleRoom);

  return (
    <>
      {room && (
        <>
          <div className="space-y-0.5">
            <h2 className="text-lg text-foreground font-semibold">
              {room?.name}
            </h2>
            {!room?.description ? (
              <p className="text-sm text-accent-foreground/70 italic">
                No room description...
              </p>
            ) : (
              <p className="text-muted-foreground text-sm">
                {room?.description}
              </p>
            )}
          </div>
          <Separator orientation="horizontal" className="my-4" />
        </>
      )}
    </>
  );
}
