import { useAppSelector } from "@/hooks/useRedux";
import { UserRole } from "@/types/models/application";
import { AppRoutes } from "@/utils/constants";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type RequireAuthProps = {
  allowedRoles: UserRole[];
};

export default function RequireAuth(props: RequireAuthProps) {
  const { authenticated, identity } = useAppSelector((state) => state.identity);
  const location = useLocation();
  const role = identity?.role;

  if (!authenticated)
    return (
      <Navigate to={AppRoutes.LOGIN.path} state={{ from: location }} replace />
    );

  return authenticated && props.allowedRoles.find((r) => r === role) ? (
    <Outlet />
  ) : (
    <Navigate
      to={AppRoutes.FORBIDDEN.path}
      state={{ from: location }}
      replace
    />
  );
}
