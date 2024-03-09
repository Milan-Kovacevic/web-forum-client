import { Skeleton } from "@/components/ui/skeleton";

type RoomItemSkeletonProps = {
  keyId: string;
};

export default function RoomItemSkeleton(props: RoomItemSkeletonProps) {
  return (
    <div
      key={props.keyId}
      className="flex flex-col items-start gap-2 border rounded-lg py-4 px-4 text-left text-sm transition-colors"
    >
      <div className="flex w-full flex-row gap-3">
        <Skeleton className="hidden sm:block h-12 w-14 rounded-full border" />
        <div className="space-y-2 w-full">
          <div className="flex justify-between gap-1">
            <Skeleton className="h-5 w-full" />
            <div className="hidden sm:flex justify-end gap-2 w-full pl-6 ml-auto">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <div className="flex justify-between gap-1 items-center">
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-7 w-7" />
          </div>
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-start gap-2 mt-1 w-1/2">
        <Skeleton className="h-6 w-1/3 rounded-2xl" />
        <Skeleton className="h-6 w-2/3 rounded-2xl" />
      </div>
    </div>
  );
}
