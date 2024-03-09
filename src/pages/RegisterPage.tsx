import RegisterForm from "@/components/forms/RegisterForm";
import AuthFormHeader from "@/components/auth/AuthFormHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthRouteItems } from "@/utils/constants";
import {
  RegisterFormDefaultValues,
  RegisterFormSchema,
} from "@/schemas/register-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import ReturnToMenuButton from "@/components/primitives/ReturnToMenuButton";
import { useRegister } from "@/hooks/useAuthentication";
import { toast } from "sonner";
import AuthAlternativesSeparator from "@/components/auth/AuthAlternativesSeparator";
import SocialAuthentication from "@/components/auth/SocialAuthentication";

export default function RegisterPage() {
  const { isLoading, register } = useRegister();
  const navigate = useNavigate();
  const registerForm = useForm<zod.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: RegisterFormDefaultValues,
  });

  function navigateToLogin() {
    navigate(AuthRouteItems.LOGIN.path);
  }

  async function handleRegister(data: zod.infer<typeof RegisterFormSchema>) {
    register(
      {
        displayName: data.displayName,
        username: data.username,
        email: data.email,
        password: data.password,
      },
      handleUserRegistered
    );
  }

  function handleUserRegistered() {
    toast.success("Registration request accepted", {
      description:
        "Check your email occasionally for information on the status of your request.",
      duration: 6000,
    });
    registerForm.reset();
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="overflow-clip dark:border-border rounded-2xl border-muted-foreground border-2 h-auto shadow-2xl flex">
        <div className="backdrop-blur dark:border-r-2 supports-[backdrop-filter]:bg-background/70 lg:w-[760px] basis-7/12 bg-background relative flex flex-col p-4 sm:p-8 md:px-14 flex-1 w-auto">
          <div className="flex flex-wrap z-10 flex-col gap-5 lg:w-auto md:my-3 p-6">
            <AuthFormHeader
              title="Create an account"
              subtitle="Enter your information below to create your account"
            />
            <RegisterForm
              form={registerForm}
              onRegister={handleRegister}
              isLoading={isLoading}
            />
            <AuthAlternativesSeparator />
            <SocialAuthentication isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden relative lg:flex lg:items-start lg:justify-end bg-clip-content bg-gradient basis-5/12">
          <div className="m-5 flex flex-col justify-center items-end gap-1">
            <p className="font-semibold text-accent dark:text-accent-foreground text-xs">
              Already have an account?
            </p>
            <Button
              size="sm"
              className="text-sm"
              variant="outline"
              onClick={navigateToLogin}
            >
              Login / Sign in
            </Button>
          </div>
          <ReturnToMenuButton className="absolute bottom-0 right-0 m-5 mr-4" />
        </div>
      </Card>
    </div>
  );
}
