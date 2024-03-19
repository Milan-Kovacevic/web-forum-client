import { RoomPermissionsFormSchema } from "@/schemas/room-permissions-form-schema";
import { UseFormReturn } from "react-hook-form";
import { z as zod } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { Icons } from "../primitives/Icons";
import FormCheckboxFieldItem from "../primitives/FormCheckboxFieldItem";
import { EveryRole, PermissionsList } from "@/utils/constants";
import { RoleType } from "@/types/models/application";

type RoomPermissionsFormProps = {
  form: UseFormReturn<zod.infer<typeof RoomPermissionsFormSchema>>;
  userRole: RoleType;
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
          {PermissionsList.map((item) => (
            <FormCheckboxFieldItem
              key={item.type}
              control={props.form.control}
              disabled={
                props.isLoading ||
                item.roles.find((r) => r === props.userRole) === undefined
              }
              name={item.type}
              label={item.name}
            />
          ))}
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
