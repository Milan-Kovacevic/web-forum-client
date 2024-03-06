import FormFieldItem from "@/components/primitives/FormFieldItem";
import { Icons } from "@/components/primitives/Icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { TwoFactorAuthSchema } from "@/schemas/two-factor-auth-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";

type TwoFactorAuthFormProps = {
  form: UseFormReturn<zod.infer<typeof TwoFactorAuthSchema>>;
  onCodeSubmit: (data: zod.infer<typeof TwoFactorAuthSchema>) => void;
  onCancel: () => void;
  onResendCode: () => void;
  isLoading: boolean;
};

export default function TwoFactorAuthForm(props: TwoFactorAuthFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onCodeSubmit)}
        className="flex gap-3 flex-col w-full justify-center"
      >
        <FormFieldItem
          control={props.form.control}
          name="twoFactorCode"
          type="text"
          display="Authentication Code"
          placeholder="your one time code"
          description="Enter the 6-digit code you received on your e-mail."
        />
        <div className="flex items-center">
          <p className="text-muted-foreground text-sm -mr-1">
            Unable to authenticate?
          </p>
          <Button
            type="button"
            onClick={props.onResendCode}
            className="text-sm"
            size="sm"
            variant="link"
          >
            Re-send new code
          </Button>
        </div>
        <div className="w-full mt-6 flex gap-3 items-center">
          <Button
            size="sm"
            variant="default"
            type="submit"
            disabled={props.isLoading}
            className="font-semibold w-full"
          >
            {props.isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Verify Code
          </Button>
          <Separator orientation="vertical" className="h-5 text-foreground" />
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={props.onCancel}
            disabled={props.isLoading}
            className="font-semibold w-full"
          >
            {props.isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Go Back
          </Button>
        </div>
      </form>
    </Form>
  );
}
