import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppRoutes } from "@/utils/constants";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex gap-6 justify-center items-center">
        <p className="text-6xl">404</p>
        <Separator className="h-8" orientation="vertical"></Separator>
        <p className="text-3xl">Page was not found</p>
      </div>
      <Link to={AppRoutes.HOME_PAGE.path}>
        <Button className="text-base text-muted-foreground" variant="link">
          Click here to go to home page.
        </Button>
      </Link>
    </div>
  );
}
