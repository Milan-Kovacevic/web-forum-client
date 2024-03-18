import { RoomPermissionsFormSchema } from "@/schemas/room-permissions-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Icons } from "../primitives/Icons";

type RoomPermissionsFormProps = {
  form: UseFormReturn<zod.infer<typeof RoomPermissionsFormSchema>>;
  onSaveChanges: (data: zod.infer<typeof RoomPermissionsFormSchema>) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export default function RoomPermissionsForm(props: RoomPermissionsFormProps) {
  return (
    <Form {...props.form}>
      <form
        onSubmit={props.form.handleSubmit(props.onSaveChanges)}
        className=" w-full flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2 ml-3">
          <FormField
            control={props.form.control}
            name="createComment"
            render={({ field }) => (
              <FormItem className="w-full space-y-1.5">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={field.name}
                      className="sm:text-sm text-xs leading-none"
                    >
                      Create Comment
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="editComment"
            render={({ field }) => (
              <FormItem className="w-full space-y-1.5">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={field.name}
                      className="sm:text-sm text-xs leading-none"
                    >
                      Edit Comment
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="removeComment"
            render={({ field }) => (
              <FormItem className="w-full space-y-1.5">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={field.name}
                      className="sm:text-sm text-xs leading-none"
                    >
                      Remove Comment
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="postComment"
            render={({ field }) => (
              <FormItem className="w-full space-y-1.5">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={field.name}
                      className="sm:text-sm text-xs leading-none"
                    >
                      Post/Approve Comment
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={props.form.control}
            name="blockComment"
            render={({ field }) => (
              <FormItem className="w-full space-y-1.5">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor={field.name}
                      className="sm:text-sm text-xs leading-none"
                    >
                      Block/Reject Comment
                    </label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 flex flex-row gap-2 ml-auto">
          <Button
            disabled={props.isLoading}
            className="sm:text-sm text-xs sm:h-9 h-8"
            size="sm"
            variant="ghost"
            type="button"
            onClick={props.onCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={props.isLoading}
            className="sm:text-sm text-xs sm:h-9 h-8"
            size="sm"
            type="submit"
            variant="default"
          >
            {props.isLoading && (
              <Icons.Spinner className="h-4 w-4 animate-spin mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
