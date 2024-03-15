import { Skeleton } from "../ui/skeleton";

export default function RoomSelectorPlaceholder() {
  const numOfItems = 12;
  const loadingItems = Array.from({ length: numOfItems }, (_, index) => index);

  return (
    <div className="flex flex-col gap-2">
      {loadingItems.map((item) => (
        <div
          key={item}
          className="flex flex-col justify-end gap-1.5 w-full border rounded-lg py-4 px-4 transition-colors"
        >
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-7 w-11/12" />
        </div>
      ))}
    </div>
  );
}
