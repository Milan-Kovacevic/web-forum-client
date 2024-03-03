import PageHeader from "@/pages/shared/PageHeader";
import { Outlet } from "react-router-dom";
import PageFooter from "@/pages/shared/PageFooter";
import { Suspense } from "react";

export default function MainLayout() {
  return (
    <div className="h-svh flex flex-col">
      <PageHeader />
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <PageFooter />
    </div>
  );
}
