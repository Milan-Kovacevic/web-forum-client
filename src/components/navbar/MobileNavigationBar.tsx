import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import appIcon from "@/assets/forum.svg";
import NavigationLink from "@/components/primitives/NavigationLink";
import { MainRouteItems, AuthRouteItems } from "@/utils/constants";

export default function MobileNavigationBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const handleNavLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          to={MainRouteItems.CHAT_ROOMS.path}
          className="flex items-center"
          onClick={handleNavLinkClick}
        >
          <img
            className="mr-2 h-5 w-5 dark:filter-white"
            src={appIcon}
            alt="logo"
          />
          <span className="font-bold text-base">web-forum</span>
        </Link>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <h4 className="text-base font-medium">Main Menu</h4>
            <NavigationLink
              text={MainRouteItems.CHAT_ROOMS.displayName}
              isActive={location.pathname === MainRouteItems.CHAT_ROOMS.path}
              navigateTo={MainRouteItems.CHAT_ROOMS.path}
              className="ext-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            />
            <NavigationLink
              text={MainRouteItems.MANAGE_ROOMS.displayName}
              isActive={location.pathname === MainRouteItems.MANAGE_ROOMS.path}
              navigateTo={MainRouteItems.MANAGE_ROOMS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>

            <NavigationLink
              text={MainRouteItems.MANAGE_USERS.displayName}
              isActive={location.pathname === MainRouteItems.MANAGE_USERS.path}
              navigateTo={MainRouteItems.MANAGE_USERS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>
          </div>
          <div className="flex flex-col space-y-3 pt-6">
            <h4 className="text-base font-medium">Authentication</h4>
            <NavigationLink
              text={AuthRouteItems.LOGIN.displayName}
              navigateTo={AuthRouteItems.LOGIN.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            />
            <NavigationLink
              text={AuthRouteItems.REGISTER.displayName}
              navigateTo={AuthRouteItems.REGISTER.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
