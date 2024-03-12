import { Icons } from "@/components/primitives/Icons";

export default function ItemLoader() {
  return (
    <div className="h-full flex items-center justify-center gap-1">
      <Icons.Spinner className="h-5 w-5 text-primary animate-spin" />
      <p className="font-medium text-sm">Loading...</p>
    </div>
  );
}
