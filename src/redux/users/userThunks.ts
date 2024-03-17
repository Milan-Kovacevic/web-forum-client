import usersService from "@/services/users-service";
import {
  ChangeUserAccountInput,
  ChangeUserRoomPermissionsInput,
} from "@/types/inputs/user-inputs";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadRegistrationRequests = createAsyncThunk(
  "loadRegistrationRequests/requests",
  () => {
    return usersService.getAllRegistrationRequests();
  }
);

export const acceptRegistrationRequest = createAsyncThunk(
  "acceptRegistrationRequest/requests",
  (requestId: string) => {
    return usersService.approveRegistrationRequest(requestId);
  }
);

export const blockRegistrationRequest = createAsyncThunk(
  "blockRegistrationRequest/requests",
  (requestId: string) => {
    return usersService.rejectRegistrationRequest(requestId);
  }
);

export const loadForumUsers = createAsyncThunk("loadForumUsers/users", () => {
  return usersService.getForumUsers();
});

export const loadSingleForumUser = createAsyncThunk(
  "loadSingleForumUser/users",
  (userId: string) => {
    return usersService.getSingleForumUser(userId);
  }
);

export const changeUserAccountInfo = createAsyncThunk(
  "changeUserAccountInfo/users",
  (input: ChangeUserAccountInput) => {
    return usersService.changeUserAccount(input);
  }
);

export const loadUserPermissionsForRoom = createAsyncThunk(
  "loadUserPermissionsForRoom/users",
  ({ userId, roomId }: { userId: string; roomId: string }) => {
    return usersService.getAllUserRoomPermissions(userId, roomId);
  }
);

export const changeUserPermissionsForRoom = createAsyncThunk(
  "changeUserPermissionsForRoom/users",
  (input: ChangeUserRoomPermissionsInput) => {
    return usersService.saveUserRoomPermissions(input);
  }
);
