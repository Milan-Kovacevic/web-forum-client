import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import {
  AUTH_XSRF_TOKEN_STORAGE_KEY,
  ExternalAuthEndpoints,
} from "@/utils/constants";

import environments from "@/environments/config";

type SocialAuthenticationProps = {
  isLoading: boolean;
};

const GITHUB_CLIENT_ID = environments().githubClientId;
const GITHUB_REDIRECT_URL = environments().githubRedirectUrl;

export default function SocialAuthentication(props: SocialAuthenticationProps) {
  const onGithubLogin = () => {
    var xsrfToken = crypto.randomUUID();
    sessionStorage.setItem(AUTH_XSRF_TOKEN_STORAGE_KEY, xsrfToken);
    parent.window.open(
      `${ExternalAuthEndpoints.GITHUB}?client_id=${GITHUB_CLIENT_ID}&state=${xsrfToken}&redirect_uri=${GITHUB_REDIRECT_URL}`,
      "_parent"
    );
  };

  return (
    <div className="flex sm:flex-row flex-col gap-2 w-full">
      <Button
        disabled={props.isLoading}
        className="sm:flex-1"
        size="sm"
        variant="outline"
        type="button"
        onClick={onGithubLogin}
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
