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
import { useState } from "react";
import AuthAlternativesSeparator from "@/components/auth/shared/AuthAlternativesSeparator";
import SocialAuthentication from "@/components/auth/shared/SocialAuthentication";
import { AuthRouteItems } from "@/routing/route-constants";
import ReturnToMenuButton from "@/components/primitives/ReturnToMenuButton";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefaultValues,
  });

  function navigateToRegistration() {
    navigate(AuthRouteItems.REGISTER.path);
  }

  function handleLogin(data: zod.infer<typeof LoginFormSchema>) {
    console.log(data.username);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <div className="w-full h-full absolute"></div>
      <div className="w-full h-full flex items-center justify-center">
        <Card className="overflow-clip dark:border-border rounded-2xl border-muted-foreground border-2 h-auto shadow-2xl flex">
          <div className="backdrop-blur dark:border-r-2 supports-[backdrop-filter]:bg-background/70 lg:w-[860px] basis-8/12 bg-background relative flex flex-col p-4 sm:p-10 md:px-14 flex-1 w-auto">
            <div className="flex flex-wrap z-10 flex-col gap-5 lg:w-auto md:my-3 p-6">
              <AuthFormHeader
                title="Welcome Back!"
                subtitle="Enter your username and password to log in to your account"
              />
              <LoginForm
                form={form}
                onLogin={handleLogin}
                isLoading={isLoading}
              />

              <AuthAlternativesSeparator />
              <SocialAuthentication isLoading={isLoading} />
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
