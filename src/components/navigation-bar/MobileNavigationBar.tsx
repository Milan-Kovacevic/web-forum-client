import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import appIcon from "@/assets/forum.svg";
import NavigationLink from "@/components/primitives/NavigationLink";
import { AppRoutes } from "@/utils/constants";
import { useAppSelector } from "@/hooks/useRedux";
import { Icons } from "@/components/primitives/Icons";

export default function MobileNavigationBar() {
  const { isAuthenticated } = useAppSelector((state) => state.identity);
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
          <Icons.MainMenu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link
          to={AppRoutes.HOME_PAGE.path}
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
              disabled={!isAuthenticated}
              text={AppRoutes.CHAT_ROOMS.displayName}
              isActive={location.pathname === AppRoutes.CHAT_ROOMS.path}
              navigateTo={AppRoutes.CHAT_ROOMS.path}
              className="ext-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            />
            <NavigationLink
              disabled={!isAuthenticated}
              text={AppRoutes.MANAGE_ROOMS.displayName}
              isActive={location.pathname === AppRoutes.MANAGE_ROOMS.path}
              navigateTo={AppRoutes.MANAGE_ROOMS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>

            <NavigationLink
              disabled={!isAuthenticated}
              text={AppRoutes.MANAGE_USERS.displayName}
              isActive={location.pathname === AppRoutes.MANAGE_USERS.path}
              navigateTo={AppRoutes.MANAGE_USERS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>
          </div>
          {!isAuthenticated && (
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="text-base font-medium">Authentication</h4>
              <NavigationLink
                text={AppRoutes.LOGIN.displayName}
                navigateTo={AppRoutes.LOGIN.path}
                className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
                onClick={handleNavLinkClick}
              />
              <NavigationLink
                text={AppRoutes.REGISTER.displayName}
                navigateTo={AppRoutes.REGISTER.path}
                className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
                onClick={handleNavLinkClick}
              />
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
