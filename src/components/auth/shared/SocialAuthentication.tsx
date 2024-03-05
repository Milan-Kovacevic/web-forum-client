import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";

type SocialAuthenticationProps = {
  isLoading: boolean;
};

export default function SocialAuthentication(props: SocialAuthenticationProps) {
  return (
    <div className="flex sm:flex-row flex-col gap-2 w-full">
      <Button
        disabled={props.isLoading}
        className="sm:flex-1"
        size="sm"
        variant="outline"
        type="button"
      >
        {props.isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.GitHub className="h-4 w-4 mr-2" />
        )}
        GitHub
      </Button>
      <Button
        disabled={props.isLoading}
        className="sm:flex-1"
        size="sm"
        variant="outline"
        type="button"
      >
        {props.isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="h-5 w-5 mr-2" />
        )}
        Google
      </Button>
      <Button
        disabled={props.isLoading}
        className="sm:flex-1"
        size="sm"
        variant="outline"
        type="button"
      >
        {props.isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Facebook className="h-3 w-3 mr-1" />
        )}
        Facebook
      </Button>
    </div>
  );
}
