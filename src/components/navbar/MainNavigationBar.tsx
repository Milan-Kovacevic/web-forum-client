import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import appIcon from "@/assets/forum.svg";
import NavigationLink from "@/components/primitives/NavigationLink";
import RouteConstants from "@/utils/route-constants";

export default function MainNavigationBar() {
  const location = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        to={RouteConstants.HOME}
        className="mr-8 flex items-center space-x-2"
      >
        <img className="h-6 w-6 dark:filter-white" src={appIcon} alt="logo" />
        <span className="hidden font-bold text-base sm:inline-block">
          web-forum
        </span>
      </Link>
      <nav className="flex items-center gap-6">
        <NavigationLink
          text="Docs"
          isActive={location.pathname === "/docs"}
          navigateTo="/docs"
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>

        <NavigationLink
          text="Components"
          isActive={location.pathname === "/docs/components"}
          navigateTo="/docs/components"
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>

        <NavigationLink
          text="Themes"
          isActive={location.pathname === "/themes"}
          navigateTo="/themes"
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>
      </nav>
    </div>
  );
}
