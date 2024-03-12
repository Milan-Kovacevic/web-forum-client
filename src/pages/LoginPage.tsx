import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AuthFormHeader from "@/components/identity/AuthFormHeader";
import LoginForm from "@/components/forms/LoginForm";
import {
  LoginFormDefaultValues,
  LoginFormSchema,
} from "@/schemas/login-form-schema";
import AuthAlternativesSeparator from "@/components/identity/AuthAlternativesSeparator";
import SocialAuthentication from "@/components/identity/SocialAuthentication";
import { AUTH_XSRF_TOKEN_STORAGE_KEY, AppRoutes } from "@/utils/constants";
import ReturnToMenuButton from "@/components/primitives/ReturnToMenuButton";
import { toast } from "sonner";
import { useEffect } from "react";
import TwoFactorAuthForm from "@/components/forms/TwoFactorAuthForm";
import {
  TwoFactorAuthFormDefaultValues,
  TwoFactorAuthSchema,
} from "@/schemas/two-factor-auth-schema";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { externalLogin, login, getMyInfo } from "@/redux/identity/authThunks";
import { cancelVerification, clearSignUp } from "@/redux/identity/authSlice";

export default function LoginPage() {
  const { authenticated } = useAppSelector((state) => state.identity);
  const navigate = useNavigate();
  const location = useLocation();
  const fromLocation =
    location.state?.from?.pathname || AppRoutes.HOME_PAGE.path;

  const dispatch = useAppDispatch();
  const { loading, loggedIn, verifyUser } = useAppSelector(
    (state) => state.auth
  );

  const loginForm = useForm<Zod.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefaultValues,
  });
  const twoFactorForm = useForm<Zod.infer<typeof TwoFactorAuthSchema>>({
    resolver: zodResolver(TwoFactorAuthSchema),
    defaultValues: TwoFactorAuthFormDefaultValues,
  });

  const handleNavigateToRegisterPage = () => {
    navigate(AppRoutes.REGISTER.path);
  };

  const handleVerificationCancel = () => {
    dispatch(cancelVerification());
  };

  const handleLogin = async (formData: Zod.infer<typeof LoginFormSchema>) => {
    await dispatch(
      login({
        username: formData.username,
        password: formData.password,
      })
    );
  };

  const handleCodeVerification = async (
    formData: Zod.infer<typeof TwoFactorAuthSchema>
  ) => {
    await dispatch(
      login({
        username: loginForm.getValues().username,
        password: loginForm.getValues().password,
        twoFactorCode: formData.twoFactorCode,
      })
    );
  };

  const handleResendCode = async () => {
    await dispatch(
      login({
        username: loginForm.getValues().username,
        password: loginForm.getValues().password,
      })
    );
  };

  useEffect(() => {
    const checkForCallbackQueryParams = () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");
      const error = queryParams.get("error");
      const errorDescription = queryParams.get("error_description");

      if (!state) return;
      if (sessionStorage.getItem(AUTH_XSRF_TOKEN_STORAGE_KEY) != state) return;

      if (code) {
        sessionStorage.removeItem(AUTH_XSRF_TOKEN_STORAGE_KEY);
        dispatch(externalLogin({ code: code, provider: "GitHub" }));
      } else if (error && errorDescription) {
        setTimeout(() => {
          toast.error(error, {
            description: errorDescription,
          });
        }, 1000);
      }
    };

    checkForCallbackQueryParams();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getMyInfo());
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!authenticated) return;
    toast.success("Welcome", {
      description: "Login successfull.",
      position: "top-center",
    });
    dispatch(clearSignUp());
    navigate(fromLocation, { replace: true });
  }, [authenticated]);

  return (
    <>
      <div className="w-full h-full absolute"></div>
      <div className="w-full h-full flex items-center justify-center">
        <Card className="overflow-clip dark:border-border rounded-2xl border-muted-foreground border-2 h-auto shadow-2xl flex">
          <div className="backdrop-blur dark:border-r-2 supports-[backdrop-filter]:bg-background/70 lg:w-[800px] basis-8/12 bg-background relative flex flex-col p-4 sm:p-10 md:px-14 flex-1 w-auto">
            <div className="flex flex-wrap z-10 flex-col gap-5 lg:w-auto md:my-3 p-6">
              {verifyUser ? (
                <>
                  <AuthFormHeader
                    title="Two-Factor Authentication"
                    subtitle="Please, enter the one time verification code that we've sent to your e-mail"
                  />
                  <TwoFactorAuthForm
                    form={twoFactorForm}
                    onCodeSubmit={handleCodeVerification}
                    onCancel={handleVerificationCancel}
                    onResendCode={handleResendCode}
                    isLoading={loading}
                  />
                </>
              ) : (
                <>
                  <AuthFormHeader
                    title="Welcome Back!"
                    subtitle="Enter your username and password to log in to your account"
                  />
                  <LoginForm
                    form={loginForm}
                    onLogin={handleLogin}
                    isLoading={loading}
                  />
                </>
              )}
              {!verifyUser && (
                <>
                  <AuthAlternativesSeparator />
                  <SocialAuthentication isLoading={loading} />
                </>
              )}
            </div>
          </div>
          <div className="hidden relative lg:flex bg-clip-content bg-gradient basis-4/12">
            <div className="absolute right-0 top-0 m-5 flex flex-col justify-center items-end gap-1">
              <p className="font-semibold dark:text-accent-foreground text-accent text-xs">
                Are your new here?
              </p>

              <Button
                size="sm"
                className="text-sm"
                variant="outline"
                onClick={handleNavigateToRegisterPage}
              >
                Register / Sign up
              </Button>
            </div>
            <ReturnToMenuButton className="absolute bottom-0 right-0 m-5 mr-4" />
          </div>
        </Card>
      </div>
    </>
  );
}
