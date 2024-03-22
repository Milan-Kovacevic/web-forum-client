import ThemeToggle from "@/components/primitives/ThemeToggle";
import appIcon from "@/assets/forum.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminAndModerator, AdminOnly, AppRoutes } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/redux/identity/authThunks";
import { clearIdentity } from "@/redux/identity/identitySlice";
import NavigationLink from "@/components/primitives/NavigationLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/primitives/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function PageHeader() {
  const { authenticated } = useAppSelector((state) => state.identity);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnLogout = () => {
    dispatch(clearIdentity());
    dispatch(logout());
    navigate(AppRoutes.LOGIN.path);
  };

  const handleOnLogin = () => {
    navigate(AppRoutes.LOGIN.path);
  };

  return (
    <header className="sticky top-0 shadow-md z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <MainNavigationBar />
        <MobileNavigationBar />
        <nav className="flex items-center ml-auto">
          <ThemeToggle />
          {authenticated ? (
            <Button
              className="ml-3 "
              size="sm"
              variant="secondary"
              onClick={handleOnLogout}
            >
              <div className="flex gap-3 items-center text-sm font-normal">
                <span>Logout</span>
                <Separator
                  className="h-4 dark:bg-neutral-300"
                  orientation="vertical"
                ></Separator>
                <span>Sign off</span>
              </div>
            </Button>
          ) : (
            <Button
              className="ml-3 "
              size="sm"
              variant="outline"
              onClick={handleOnLogin}
            >
              <div className="flex gap-3 items-center text-sm font-normal">
                <span>Sign in</span>
                <Separator
                  className="h-4 dark:bg-neutral-300"
                  orientation="vertical"
                ></Separator>
                <span>Sign up</span>
              </div>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

const MainNavigationBar = () => {
  const location = useLocation();
  const { authenticated, identity } = useAppSelector((state) => state.identity);
  const role = identity?.roleType;

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
          isActive={
            location.pathname === AppRoutes.CHAT_ROOMS.path ||
            (location.pathname.startsWith(AppRoutes.CHAT_ROOMS.path) &&
              !location.pathname.startsWith(AppRoutes.MANAGE_ROOMS.path))
          }
          navigateTo={AppRoutes.CHAT_ROOMS.path}
          className="transition-colors hover:text-foreground/80 font-medium text-sm"
        ></NavigationLink>
        {AdminAndModerator.find((r) => r === role) && (
          <NavigationLink
            disabled={!authenticated}
            text={AppRoutes.MANAGE_ROOMS.displayName}
            isActive={
              location.pathname === AppRoutes.MANAGE_ROOMS.path ||
              location.pathname.startsWith(AppRoutes.MANAGE_ROOMS.path)
            }
            navigateTo={AppRoutes.MANAGE_ROOMS.path}
            className="transition-colors hover:text-foreground/80 font-medium text-sm"
          ></NavigationLink>
        )}
        {AdminOnly.find((r) => r === role) && (
          <NavigationLink
            disabled={!authenticated}
            text={AppRoutes.MANAGE_USERS.displayName}
            isActive={
              location.pathname === AppRoutes.MANAGE_USERS.path ||
              location.pathname.startsWith(AppRoutes.MANAGE_USERS.path)
            }
            navigateTo={AppRoutes.MANAGE_USERS.path}
            className="transition-colors hover:text-foreground/80 font-medium text-sm"
          ></NavigationLink>
        )}
      </nav>
    </div>
  );
};

const MobileNavigationBar = () => {
  const { authenticated } = useAppSelector((state) => state.identity);
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
              disabled={!authenticated}
              text={AppRoutes.CHAT_ROOMS.displayName}
              isActive={
                location.pathname === AppRoutes.CHAT_ROOMS.path ||
                (location.pathname.startsWith(AppRoutes.CHAT_ROOMS.path) &&
                  !location.pathname.startsWith(AppRoutes.MANAGE_ROOMS.path))
              }
              navigateTo={AppRoutes.CHAT_ROOMS.path}
              className="ext-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            />
            <NavigationLink
              disabled={!authenticated}
              text={AppRoutes.MANAGE_ROOMS.displayName}
              isActive={
                location.pathname === AppRoutes.MANAGE_ROOMS.path ||
                location.pathname.startsWith(AppRoutes.MANAGE_ROOMS.path)
              }
              navigateTo={AppRoutes.MANAGE_ROOMS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>

            <NavigationLink
              disabled={!authenticated}
              text={AppRoutes.MANAGE_USERS.displayName}
              isActive={
                location.pathname === AppRoutes.MANAGE_USERS.path ||
                location.pathname.startsWith(AppRoutes.MANAGE_USERS.path)
              }
              navigateTo={AppRoutes.MANAGE_USERS.path}
              className="text-foreground/60 transition-colors hover:text-foreground/80 text-sm"
              onClick={handleNavLinkClick}
            ></NavigationLink>
          </div>
          {!authenticated && (
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
};
