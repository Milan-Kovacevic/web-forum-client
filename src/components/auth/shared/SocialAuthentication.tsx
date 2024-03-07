import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import { externalLogin } from "@/services/auth-service";
import {
  AUTH_XSRF_TOKEN_STORAGE_KEY,
  ExternalAuthEndpoints,
  MainRouteItems,
} from "@/utils/constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import environments from "@/environments/config";

type SocialAuthenticationProps = {
  isLoading: boolean;
  updateIsLoading?: (value: boolean) => void;
};

const GITHUB_CLIENT_ID = environments().githubClientId;
const GITHUB_REDIRECT_URL = environments().githubRedirectUrl;

export default function SocialAuthentication(props: SocialAuthenticationProps) {
  const { sendRequest, handleResponse } = externalLogin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkForCallbackQueryParams = () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");
      const error = queryParams.get("error");
      const errorDescription = queryParams.get("error_description");

      if (!state) return;
      if (localStorage.getItem(AUTH_XSRF_TOKEN_STORAGE_KEY) != state) return;

      if (code) handleAuthWithGithub(code);
      else if (error && errorDescription) {
        setTimeout(
          () => handleLoginFailure("Authentication failed", errorDescription),
          1000
        );
      }
    };

    checkForCallbackQueryParams();
  }, []);

  const handleAuthWithGithub = (code: string) => {
    if (props.updateIsLoading) props.updateIsLoading(true);
    sendRequest({ code: code, provider: "GitHub" })
      .then((response) => handleResponse(response))
      .then((response) => {
        if (response?.status === 200 && response.data !== null) {
          toast.success("Welcome", { description: "Login was successfull." });
          setTimeout(() => navigate(MainRouteItems.CHAT_ROOMS.path), 1000);
        }
      })
      .catch(() =>
        handleLoginFailure(
          "Authentication failed",
          "Unable to authenticate with external provider"
        )
      )
      .finally(() => {
        if (props.updateIsLoading) props.updateIsLoading(false);
      });
  };

  const handleLoginFailure = (title: string, message: string) => {
    toast.error(title, {
      description: message,
    });
  };

  const onGithubLogin = () => {
    var xsrfToken = crypto.randomUUID();
    localStorage.setItem("forum_xsrf_token", xsrfToken);
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
