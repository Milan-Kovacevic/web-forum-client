import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type FormCheckboxFieldItemProps = {
  control: any;
  name: string;
  label?: string;
  disabled?: boolean;
};

export default function FormCheckboxFieldItem(
  props: FormCheckboxFieldItemProps
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1.5">
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                disabled={props.disabled}
                id={field.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {props.label && (
                <label
                  htmlFor={field.name}
                  className={cn(
                    "sm:text-sm text-xs leading-none",
                    props.disabled
                      ? "text-muted-foreground hover:cursor-not-allowed"
                      : ""
                  )}
                >
                  {props.label}
                </label>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
