import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaFieldItemProps = {
  control: any;
  name: string;
  display?: string;
  description?: string;
  placeholder?: string;
  className?: string;
};

export default function FormTextareaFieldItem(
  props: FormTextareaFieldItemProps
) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1.5", props.className)}>
          <div className="flex items-center gap-1">
            {props.display && (
              <Label className="ml-1 font-medium">{props.display}</Label>
            )}
            <FormMessage className="text-xs ml-1" />
          </div>
          <FormControl>
            <Textarea placeholder={props.placeholder} {...field} />
          </FormControl>
          {props.description && (
            <FormDescription className="text-xs ml-1">
              {props.description}
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
}
