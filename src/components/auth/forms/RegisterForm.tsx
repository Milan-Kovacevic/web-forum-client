import FormFieldItem from "@/components/primitives/FormFieldItem";
import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RegisterFormSchema } from "@/schemas/register-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";

type RegisterFormProps = {
  form: UseFormReturn<zod.infer<typeof RegisterFormSchema>>;
  onRegister: (data: zod.infer<typeof RegisterFormSchema>) => void;
  isLoading: boolean;
};

export default function RegisterForm(props: RegisterFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onRegister)}
        className="flex gap-2 flex-col w-full items-center justify-center"
      >
        <FormFieldItem
          control={props.form.control}
          name="displayName"
          display="Display Name"
          description="Other users will be able to see this."
          placeholder="forum user"
        />
        <FormFieldItem
          control={props.form.control}
          name="username"
          display="Username"
          placeholder="your username"
        />
        <FormFieldItem
          control={props.form.control}
          name="email"
          display="E-Mail"
          placeholder="name@example.com"
        />

        <FormFieldItem
          control={props.form.control}
          type="password"
          name="password"
          display="Password"
          placeholder="your password"
        />
        <FormFieldItem
          control={props.form.control}
          type="password"
          name="confirmPassword"
          display="Confirm Password"
          placeholder="confirm password"
          description="Note: passwords must match"
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
          Register / Sign Up
        </Button>
      </form>
    </Form>
  );
}
