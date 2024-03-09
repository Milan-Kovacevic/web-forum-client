import PageHeader from "@/pages/shared/PageHeader";
import { Outlet } from "react-router-dom";
import PageFooter from "@/pages/shared/PageFooter";

export default function MainLayout() {
  return (
    <div className="h-svh flex flex-col">
      <PageHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}
