import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type FormFieldItemProps = {
  control: any;
  name: string;
  display?: string;
  hasDescription?: boolean;
};

export default function FormInputOtpFieldItem(props: FormFieldItemProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full space-y-2">
          <div className="flex items-center gap-1">
            {props.display && (
              <FormLabel className="ml-1 font-medium">
                {props.display}
              </FormLabel>
            )}
            <FormMessage className="text-xs ml-1" />
          </div>
          <FormControl>
            <InputOTP
              maxLength={6}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                  ))}{" "}
                </InputOTPGroup>
              )}
              {...field}
            />
          </FormControl>
          {props.hasDescription && (
            <FormDescription className="text-xs ml-1">
              {field.value === "" ? (
                <>Please enter the 6-digit code sent to your your e-mail.</>
              ) : (
                <>You entered: {field.value}</>
              )}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
