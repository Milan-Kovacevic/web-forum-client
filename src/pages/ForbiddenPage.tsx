import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { clearIdentity } from "@/redux/identity-slice";
import { logout } from "@/redux/thunks/identity-thunk";
import { AppRoutes } from "@/utils/constants";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  const { isAuthenticated } = useAppSelector((state) => state.identity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearIdentity());
      dispatch(logout());
    }
  }, [isAuthenticated]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex gap-6 justify-center items-center">
        <p className="text-6xl">403</p>
        <Separator className="h-8" orientation="vertical"></Separator>
        <p className="text-3xl">Oops, Forbidden action.</p>
      </div>
      <Link to={AppRoutes.LOGIN.path}>
        <Button className="text-base text-muted-foreground" variant="link">
          Click here to authenticate.
        </Button>
      </Link>
    </div>
  );
}
