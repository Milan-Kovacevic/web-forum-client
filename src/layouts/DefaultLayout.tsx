import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div className="h-svh w-full flex flex-col">
      <main className="flex-1">
        <Outlet></Outlet>
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}
