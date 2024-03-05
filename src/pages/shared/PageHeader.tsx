import ThemeToggle from "@/components/primitives/ThemeToggle";
import MainNavigationBar from "@/components/navbar/MainNavigationBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import MobileNavigationBar from "@/components/navbar/MobileNavigationBar";
import { AuthRouteItems } from "@/routing/route-constants";

export default function PageHeader() {
  return (
    <header className="sticky top-0 shadow-sm z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <MainNavigationBar />
        <MobileNavigationBar />
        <nav className="flex items-center ml-auto">
          <ThemeToggle />
          <Link className="md:block hidden" to={AuthRouteItems.LOGIN.path}>
            <Button className="ml-3 " size="sm" variant="outline">
              <div className="flex gap-3 items-center text-sm font-normal">
                <span>Sign in</span>
                <Separator
                  className="h-4 dark:bg-neutral-300"
                  orientation="vertical"
                ></Separator>
                <span>Sign up</span>
              </div>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
