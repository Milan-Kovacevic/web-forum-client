import { Separator } from "@/components/ui/separator";

export default function PageFooter() {
  return (
    <footer className="sticky z-50 py-4 md:px-8 shadow-sm bg-background bottom-0 w-full border-t border-border/80">
      <div className="flex gap-10 justify-center items-center">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Web Forum @ 2024</h4>
          <p className="text-sm text-muted-foreground">
            Discuss Diverse Topics
          </p>
        </div>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <div className="items-end flex-col text-sm hidden sm:flex">
          <p className="text-xs">Created By</p>
          <p>Milan Kovacevic</p>
        </div>
      </div>
    </footer>
  );
}
