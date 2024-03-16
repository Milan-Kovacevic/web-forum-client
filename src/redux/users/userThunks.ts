import userService from "@/services/user-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadRegistrationRequests = createAsyncThunk(
  "loadRegistrationRequests/requests",
  () => {
    return userService.getAllRegistrationRequests();
  }
);

export const acceptRegistrationRequest = createAsyncThunk(
  "acceptRegistrationRequest/requests",
  (requestId: string) => {
    return userService.approveRegistrationRequest(requestId);
  }
);

export const blockRegistrationRequest = createAsyncThunk(
  "blockRegistrationRequest/requests",
  (requestId: string) => {
    return userService.rejectRegistrationRequest(requestId);
  }
);
