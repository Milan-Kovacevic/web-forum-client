import { Button } from "@/components/ui/button";
import appIcon from "@/assets/forum.svg";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/utils/constants";
import { useAppSelector } from "@/hooks/useRedux";

export default function HomePage() {
  return (
    <div className="w-full flex max-w-screen-2xl p-8 mx-auto h-screen">
      <div className="flex w-full flex-col items-center mt-32">
        <HomePageInfoSection />
        <HomePageActions />
      </div>
    </div>
  );
}

const HomePageInfoSection = () => (
  <>
    <img
      className="h-24 sm:h-32 md:h-40 dark:filter-white mb-6 opacity-95 animate-bounce"
      src={appIcon}
      alt="logo"
    />
    <h1 className="text-center text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl mb-3">
      Connect through Conversations
    </h1>
    <span className="max-w-[750px] text-center text-sm md:text-lg  text-muted-foreground sm:text-base">
      Join the discussion, share ideas, and connect with others in our vibrant
      online community.
    </span>
  </>
);

const HomePageActions = () => {
  const { authenticated } = useAppSelector((state) => state.identity);

  return (
    <div className="flex gap-3 mt-7">
      <Link
        to={authenticated ? AppRoutes.CHAT_ROOMS.path : AppRoutes.REGISTER.path}
      >
        <Button
          className="w-28 shadow-md transition-colors"
          size="sm"
          variant="default"
        >
          Get Started
        </Button>
      </Link>
      {!authenticated && (
        <Link to={AppRoutes.LOGIN.path}>
          <Button
            className="w-28 shadow-md transition-colors"
            size="sm"
            variant="outline"
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};
