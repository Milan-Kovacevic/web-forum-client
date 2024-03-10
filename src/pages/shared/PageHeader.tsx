import ThemeToggle from "@/components/primitives/ThemeToggle";
import MainNavigationBar from "@/components/navigation-bar/MainNavigationBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import MobileNavigationBar from "@/components/navigation-bar/MobileNavigationBar";
import { AuthRouteItems } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/redux/thunks/identity-thunk";
import { useEffect } from "react";
import { clearRequireLogin } from "@/redux/identity-slice";

export default function PageHeader() {
  const { isAuthenticated, requireLogin } = useAppSelector(
    (state) => state.identity
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnLogout = () => {
    dispatch(logout());
  };

  const handleOnLogin = () => {
    navigate(AuthRouteItems.LOGIN.path);
  };

  useEffect(() => {
    if (requireLogin) {
      navigate(AuthRouteItems.LOGIN.path);
      dispatch(clearRequireLogin());
    }
  }, [requireLogin]);

  return (
    <header className="sticky top-0 shadow-sm z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <MainNavigationBar />
        <MobileNavigationBar />
        <nav className="flex items-center ml-auto">
          <ThemeToggle />
          {isAuthenticated ? (
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
