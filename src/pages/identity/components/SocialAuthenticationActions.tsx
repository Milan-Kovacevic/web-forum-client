import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import {
  AUTH_XSRF_TOKEN_STORAGE_KEY,
  ExternalAuthEndpoints,
} from "@/utils/constants";

import environments from "@/environments/config";
import { LoginProvider } from "@/types/models/application";

type SocialAuthenticationActionsProps = {
  isLoading: boolean;
};

const GITHUB_CLIENT_ID = environments().githubClientId;
const GOOGLE_CLIENT_ID = environments().googleClientId;
const FACEBOOK_CLIENT_ID = environments().facebookClientId;
const REDIRECT_URL = environments().redirectUrl;

export default function SocialAuthenticationActions(
  props: SocialAuthenticationActionsProps
) {
  const handleGithubLogin = () => {
    var xsrfToken = crypto.randomUUID();
    var provider: LoginProvider = "GitHub";
    var state = `${provider}-${xsrfToken}`;
    sessionStorage.setItem(AUTH_XSRF_TOKEN_STORAGE_KEY, state);
    parent.window.open(
      `${ExternalAuthEndpoints.GITHUB}?client_id=${GITHUB_CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URL}`,
      "_parent"
    );
  };

  const handleGoogleLogin = () => {
    var xsrfToken = crypto.randomUUID();
    var provider: LoginProvider = "Google";
    var state = `${provider}-${xsrfToken}`;
    sessionStorage.setItem(AUTH_XSRF_TOKEN_STORAGE_KEY, state);
    parent.window.open(
      `${ExternalAuthEndpoints.GOOGLE}?client_id=${GOOGLE_CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URL}&scope=profile&response_type=code`,
      "_parent"
    );
  };

  const handleFacebookLogin = () => {
    var xsrfToken = crypto.randomUUID();
    var provider: LoginProvider = "Facebook";
    var state = `${provider}-${xsrfToken}`;
    sessionStorage.setItem(AUTH_XSRF_TOKEN_STORAGE_KEY, state);
    parent.window.open(
      `${ExternalAuthEndpoints.FACEBOOK}?client_id=${FACEBOOK_CLIENT_ID}&state=${state}&redirect_uri=${REDIRECT_URL}`,
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
        onClick={handleGithubLogin}
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
        onClick={handleGoogleLogin}
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
        onClick={handleFacebookLogin}
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
