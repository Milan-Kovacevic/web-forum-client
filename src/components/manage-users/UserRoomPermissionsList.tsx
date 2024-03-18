import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import RoomPermissionsForm from "../forms/RoomPermissionsForm";
import { useForm } from "react-hook-form";
import { RoomPermissionsFormSchema } from "@/schemas/room-permissions-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changeUserPermissionsForRoom,
  loadUserPermissionsForRoom,
} from "@/redux/users/userThunks";
import { ChangeUserRoomPermissionsInput } from "@/types/inputs/user-inputs";

export default function UserRoomPermissionsList() {
  const {
    managedUser,
    loadingManagedUser,
    loadingUserPermissions,
    selectedRoom,
    userPermissions,
  } = useAppSelector((state) => state.manageUser);
  const dispatch = useAppDispatch();

  const defaultValues = {
    createComment:
      userPermissions.find((p) => p.permissionId === 1) !== undefined,
    editComment:
      userPermissions.find((p) => p.permissionId === 2) !== undefined,
    removeComment:
      userPermissions.find((p) => p.permissionId === 3) !== undefined,
    postComment:
      userPermissions.find((p) => p.permissionId === 4) !== undefined,
    blockComment:
      userPermissions.find((p) => p.permissionId === 5) !== undefined,
  };

  const permissionsForm = useForm<Zod.infer<typeof RoomPermissionsFormSchema>>({
    resolver: zodResolver(RoomPermissionsFormSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (selectedRoom !== null && managedUser !== null) {
      dispatch(
        loadUserPermissionsForRoom({
          userId: managedUser.userId,
          roomId: selectedRoom.roomId,
        })
      );
    }
  }, [selectedRoom, managedUser]);

  useEffect(() => {
    permissionsForm.setValue(
      "createComment",
      userPermissions.find((p) => p.permissionId === 1) !== undefined
    );
    permissionsForm.setValue(
      "editComment",
      userPermissions.find((p) => p.permissionId === 2) !== undefined
    );
    permissionsForm.setValue(
      "removeComment",
      userPermissions.find((p) => p.permissionId === 3) !== undefined
    );
    permissionsForm.setValue(
      "postComment",
      userPermissions.find((p) => p.permissionId === 4) !== undefined
    );
    permissionsForm.setValue(
      "blockComment",
      userPermissions.find((p) => p.permissionId === 5) !== undefined
    );
  }, [userPermissions]);

  const handleCancelChanges = () => {
    permissionsForm.setValue(
      "createComment",
      userPermissions.find((p) => p.permissionId === 1) !== undefined
    );
    permissionsForm.setValue(
      "editComment",
      userPermissions.find((p) => p.permissionId === 2) !== undefined
    );
    permissionsForm.setValue(
      "removeComment",
      userPermissions.find((p) => p.permissionId === 3) !== undefined
    );
    permissionsForm.setValue(
      "postComment",
      userPermissions.find((p) => p.permissionId === 4) !== undefined
    );
    permissionsForm.setValue(
      "blockComment",
      userPermissions.find((p) => p.permissionId === 5) !== undefined
    );
  };
  const handleSavePermissions = (
    data: Zod.infer<typeof RoomPermissionsFormSchema>
  ) => {
    if (!managedUser || !selectedRoom) return;

    var permissions: number[] = [];
    if (data.createComment) permissions.push(1);
    if (data.editComment) permissions.push(2);
    if (data.removeComment) permissions.push(3);
    if (data.postComment) permissions.push(4);
    if (data.blockComment) permissions.push(5);

    var input: ChangeUserRoomPermissionsInput = {
      userId: managedUser.userId,
      roomId: selectedRoom.roomId,
      permissions: permissions,
    };
    dispatch(changeUserPermissionsForRoom(input));
  };

  return (
    <div className="flex flex-col mt-2">
      {selectedRoom === null ? (
        <div>
          <p className="text-muted-foreground text-sm mt-2">
            Select the specific room to view user permissions...
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center gap-2 mb-3">
            <p className="sm:text-sm text-xs text-muted-foreground">
              User Permissions for:{" "}
            </p>
            <span className="sm:text-base text-sm font-medium text-accent-foreground/80">
              {selectedRoom?.name}
            </span>
          </div>
          <RoomPermissionsForm
            form={permissionsForm}
            isLoading={loadingManagedUser || loadingUserPermissions}
            onCancel={handleCancelChanges}
            onSaveChanges={handleSavePermissions}
          />
        </>
      )}
    </div>
  );
}
