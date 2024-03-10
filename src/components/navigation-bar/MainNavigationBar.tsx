import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import appIcon from "@/assets/forum.svg";
import NavigationLink from "@/components/primitives/NavigationLink";
import { AdminAndModerator, AdminOnly, AppRoutes } from "@/utils/constants";
import { useAppSelector } from "@/hooks/useRedux";

export default function MainNavigationBar() {
  const location = useLocation();
  const { authenticated, identity } = useAppSelector((state) => state.identity);
  const role = identity?.role;

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        to={AppRoutes.HOME_PAGE.path}
        className="mr-8 flex items-center space-x-2"
      >
        <img className="h-6 w-6 dark:filter-white" src={appIcon} alt="logo" />
        <span className="hidden font-bold text-base lg:inline-block">
          web-forum
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <NavigationLink
          disabled={!authenticated}
          text={AppRoutes.CHAT_ROOMS.displayName}
          isActive={location.pathname === AppRoutes.CHAT_ROOMS.path}
          navigateTo={AppRoutes.CHAT_ROOMS.path}
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>
        {AdminAndModerator.find((r) => r === role) && (
          <NavigationLink
            disabled={!authenticated}
            text={AppRoutes.MANAGE_ROOMS.displayName}
            isActive={location.pathname === AppRoutes.MANAGE_ROOMS.path}
            navigateTo={AppRoutes.MANAGE_ROOMS.path}
            className="transition-colors hover:text-foreground/80 font-medium text-sm"
          ></NavigationLink>
        )}
        {AdminOnly.find((r) => r === role) && (
          <NavigationLink
            disabled={!authenticated}
            text={AppRoutes.MANAGE_USERS.displayName}
            isActive={location.pathname === AppRoutes.MANAGE_USERS.path}
            navigateTo={AppRoutes.MANAGE_USERS.path}
            className="transition-colors hover:text-foreground/80 font-medium text-sm"
          ></NavigationLink>
        )}
      </nav>
    </div>
  );
}
