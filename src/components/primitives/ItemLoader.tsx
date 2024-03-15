import { Icons } from "@/components/primitives/Icons";
import { cn } from "@/lib/utils";

type ItemLoaderProps = {
  className?: string;
};

export default function ItemLoader(props: ItemLoaderProps) {
  return (
    <div
      className={cn(
        "h-full flex items-center justify-center gap-1",
        props.className
      )}
    >
      <Icons.Spinner className="h-5 w-5 text-primary animate-spin" />
      <p className="font-medium text-sm">Loading...</p>
    </div>
  );
}
