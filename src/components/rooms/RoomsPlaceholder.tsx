import RoomItemSkeleton from "./RoomItemSkeleton";

export default function RoomsPlaceholder() {
  const numOfItems = 12;
  const loadingItems = Array.from({ length: numOfItems }, (_, index) => index);
  return (
    <>
      {loadingItems.map((item) => (
        <RoomItemSkeleton key={item} />
      ))}
    </>
  );
}
