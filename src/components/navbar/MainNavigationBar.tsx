import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import appIcon from "@/assets/forum.svg";
import NavigationLink from "@/components/primitives/NavigationLink";
import { MainRouteItems } from "@/utils/constants";

export default function MainNavigationBar() {
  const location = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        to={MainRouteItems.CHAT_ROOMS.path}
        className="mr-8 flex items-center space-x-2"
      >
        <img className="h-6 w-6 dark:filter-white" src={appIcon} alt="logo" />
        <span className="hidden font-bold text-base lg:inline-block">
          web-forum
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <NavigationLink
          text={MainRouteItems.CHAT_ROOMS.displayName}
          isActive={location.pathname === MainRouteItems.CHAT_ROOMS.path}
          navigateTo={MainRouteItems.CHAT_ROOMS.path}
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>

        <NavigationLink
          text={MainRouteItems.MANAGE_ROOMS.displayName}
          isActive={location.pathname === MainRouteItems.MANAGE_ROOMS.path}
          navigateTo={MainRouteItems.MANAGE_ROOMS.path}
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>

        <NavigationLink
          text={MainRouteItems.MANAGE_USERS.displayName}
          isActive={location.pathname === MainRouteItems.MANAGE_USERS.path}
          navigateTo={MainRouteItems.MANAGE_USERS.path}
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>
      </nav>
    </div>
  );
}
