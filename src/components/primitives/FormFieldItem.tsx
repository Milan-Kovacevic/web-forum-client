import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormFieldItemProps = {
  control: any;
  name: string;
  display?: string;
  description?: string;
  placeholder: string;
  type?: string;
};

export default function FormFieldItem(props: FormFieldItemProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className="w-full space-y-1">
          <div className="flex items-center gap-1">
            {props.display && (
              <Label className="ml-1 font-medium">{props.display}</Label>
            )}
            <FormMessage className="text-xs ml-1" />
          </div>
          <FormControl>
            <Input
              type={props.type ?? "text"}
              className="h-9"
              placeholder={props.placeholder}
              {...field}
            />
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
