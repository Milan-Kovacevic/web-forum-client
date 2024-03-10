import PageHeader from "@/pages/shared/PageHeader";
import PageFooter from "@/pages/shared/PageFooter";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { AppRoutes } from "@/utils/constants";

export default function MainLayout() {
  const { forbidden } = useAppSelector((state) => state.identity);
  const navigate = useNavigate();

  useEffect(() => {
    if (forbidden) {
      navigate(AppRoutes.FORBIDDEN.path);
    }
  }, [forbidden]);

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
