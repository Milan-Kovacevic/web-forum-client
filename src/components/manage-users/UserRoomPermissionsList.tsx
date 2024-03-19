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
import {
  PermissionIdResolver,
  PermissionsList,
  RoleDictionary,
} from "@/utils/constants";
import { Permission } from "@/types/models/application";

export default function UserRoomPermissionsList() {
  const {
    managedUser,
    loadingManagedUser,
    loadingUserPermissions,
    selectedRoom,
    userPermissions,
  } = useAppSelector((state) => state.manageUser);
  const dispatch = useAppDispatch();

  const defaultValues: { [key: string]: boolean } = PermissionsList.reduce(
    (acc: { [key: string]: boolean }, permission: Permission) => {
      acc[permission.type] =
        userPermissions.find(
          (p) => p.permissionId === PermissionIdResolver[permission.type]
        ) !== undefined;
      return acc;
    },
    {}
  );

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
    PermissionsList.forEach((item) => {
      permissionsForm.setValue(
        item.type,
        userPermissions.find(
          (p) => p.permissionId === PermissionIdResolver[item.type]
        ) !== undefined
      );
    });
  }, [userPermissions]);

  const handleCancelChanges = () => {
    PermissionsList.forEach((item) => {
      permissionsForm.setValue(
        item.type,
        userPermissions.find(
          (p) => p.permissionId === PermissionIdResolver[item.type]
        ) !== undefined
      );
    });
  };

  const handleSavePermissions = (
    data: Zod.infer<typeof RoomPermissionsFormSchema>
  ) => {
    if (!managedUser || !selectedRoom) return;

    var permissions: number[] = [];
    if (data.CreateComment) permissions.push(1);
    if (data.EditComment) permissions.push(2);
    if (data.RemoveComment) permissions.push(3);
    if (data.PostComment) permissions.push(4);
    if (data.BlockComment) permissions.push(5);

    var input: ChangeUserRoomPermissionsInput = {
      userId: managedUser.userId,
      roomId: selectedRoom.roomId,
      permissions: permissions,
    };
    dispatch(changeUserPermissionsForRoom(input));
  };

  return (
    <div className="flex flex-col mt-2">
      {selectedRoom === null || managedUser === null ? (
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
            userRole={RoleDictionary[managedUser.roleId].type}
            isLoading={loadingManagedUser || loadingUserPermissions}
            onCancel={handleCancelChanges}
            onSaveChanges={handleSavePermissions}
          />
        </>
      )}
    </div>
  );
}
