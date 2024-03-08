import FormInputFieldItem from "@/components/primitives/FormInputFieldItem";
import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoginFormSchema } from "@/schemas/login-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";

type LoginFormProps = {
  form: UseFormReturn<zod.infer<typeof LoginFormSchema>>;
  onLogin: (data: zod.infer<typeof LoginFormSchema>) => void;
  isLoading: boolean;
};

export default function LoginForm(props: LoginFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onLogin)}
        className="flex gap-2 flex-col w-full items-center justify-center"
      >
        <FormInputFieldItem
          control={props.form.control}
          name="username"
          display="Username"
          placeholder="ex. user123"
        />
        <FormInputFieldItem
          control={props.form.control}
          type="password"
          name="password"
          display="Password"
          placeholder="your password"
        />
        <Button
          size="sm"
          variant="default"
          type="submit"
          disabled={props.isLoading}
          className="w-full mt-8 font-semibold"
        >
          {props.isLoading && (
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Login / Sign In
        </Button>
      </form>
    </Form>
  );
}
