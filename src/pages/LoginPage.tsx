import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import AuthFormHeader from "@/components/auth/shared/AuthFormHeader";
import LoginForm from "@/components/auth/forms/LoginForm";
import {
  LoginFormDefaultValues,
  LoginFormSchema,
} from "@/schemas/login-form-schema";
import { z as zod } from "zod";
import AuthAlternativesSeparator from "@/components/auth/shared/AuthAlternativesSeparator";
import SocialAuthentication from "@/components/auth/shared/SocialAuthentication";
import { AuthRouteItems, MainRouteItems } from "@/utils/constants";
import ReturnToMenuButton from "@/components/primitives/ReturnToMenuButton";
import { useLogin } from "@/api/hooks/useAuthentication";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import TwoFactorAuthForm from "@/components/auth/forms/TwoFactorAuthForm";
import {
  TwoFactorAuthFormDefaultValues,
  TwoFactorAuthSchema,
} from "@/schemas/two-factor-auth-schema";

export default function LoginPage() {
  const { isLoading, data, response, login } = useLogin();
  const [show2fa, setShow2fa] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefaultValues,
  });
  const twoFactorForm = useForm<z.infer<typeof TwoFactorAuthSchema>>({
    resolver: zodResolver(TwoFactorAuthSchema),
    defaultValues: TwoFactorAuthFormDefaultValues,
  });

  function navigateToRegistration() {
    navigate(AuthRouteItems.REGISTER.path);
  }

  async function handleLogin(formData: zod.infer<typeof LoginFormSchema>) {
    await login({
      username: formData.username,
      password: formData.password,
    });
  }

  async function handleCodeVerify(
    formData: zod.infer<typeof TwoFactorAuthSchema>
  ) {
    await login({
      username: loginForm.getValues().username,
      password: loginForm.getValues().password,
      twoFactorCode: formData.twoFactorCode,
    });
  }

  function handle2faCancel() {
    setShow2fa(false);
  }

  async function handleResendCode() {
    await login({
      username: loginForm.getValues().username,
      password: loginForm.getValues().password,
    });
  }

  useEffect(() => {
    if (response?.status === 204) {
      setShow2fa(true);
    } else if (response?.status === 200 && data !== null) {
      toast.success("Welcome", {
        description: "Login successfull.",
        position: "top-center",
      });
      setTimeout(() => navigate(MainRouteItems.CHAT_ROOMS.path), 1000);
    }
  }, [response]);

  return (
    <>
      <div className="w-full h-full absolute"></div>
      <div className="w-full h-full flex items-center justify-center">
        <Card className="overflow-clip dark:border-border rounded-2xl border-muted-foreground border-2 h-auto shadow-2xl flex">
          <div className="backdrop-blur dark:border-r-2 supports-[backdrop-filter]:bg-background/70 lg:w-[800px] basis-8/12 bg-background relative flex flex-col p-4 sm:p-10 md:px-14 flex-1 w-auto">
            <div className="flex flex-wrap z-10 flex-col gap-5 lg:w-auto md:my-3 p-6">
              {show2fa ? (
                <>
                  <AuthFormHeader
                    title="Two-Factor Authentication"
                    subtitle="Please, enter the one time verification code that we've sent to your e-mail"
                  />
                  <TwoFactorAuthForm
                    form={twoFactorForm}
                    onCodeSubmit={handleCodeVerify}
                    onCancel={handle2faCancel}
                    onResendCode={handleResendCode}
                    isLoading={isLoading}
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
                    isLoading={isLoading}
                  />
                </>
              )}
              {!show2fa && (
                <>
                  <AuthAlternativesSeparator />
                  <SocialAuthentication isLoading={isLoading} />
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
                onClick={navigateToRegistration}
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
