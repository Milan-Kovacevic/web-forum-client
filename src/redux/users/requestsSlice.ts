import { RegistrationRequest } from "@/types/models/users";
import { createSlice } from "@reduxjs/toolkit";
import {
  acceptRegistrationRequest,
  blockRegistrationRequest,
  loadRegistrationRequests,
} from "./userThunks";

interface RequestsState {
  loadingRequests: boolean;
  loadingRequestDialog: boolean;
  registrationRequests: RegistrationRequest[];
  requestAction: "Approve" | "Reject" | null;
}

const initialState: RequestsState = {
  loadingRequests: false,
  loadingRequestDialog: false,
  registrationRequests: [],
  requestAction: null,
};

const requestsSlice = createSlice({
  name: "registration-requests",
  initialState: initialState,
  reducers: {
    clearRequestsAction(state) {
      state.requestAction = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRegistrationRequests.pending, (state) => {
      state.loadingRequests = true;
    });
    builder.addCase(loadRegistrationRequests.rejected, (state) => {
      state.loadingRequests = false;
    });
    builder.addCase(loadRegistrationRequests.fulfilled, (state, action) => {
      state.loadingRequests = false;
      state.registrationRequests = action.payload;
    });

    builder.addCase(acceptRegistrationRequest.pending, (state) => {
      state.loadingRequestDialog = true;
    });
    builder.addCase(blockRegistrationRequest.pending, (state) => {
      state.loadingRequestDialog = true;
    });
    builder.addCase(acceptRegistrationRequest.fulfilled, (state) => {
      state.loadingRequestDialog = false;
      state.requestAction = "Approve";
    });
    builder.addCase(blockRegistrationRequest.fulfilled, (state) => {
      state.loadingRequestDialog = false;
      state.requestAction = "Reject";
    });

    builder.addMatcher(
      (action) => action.type.endsWith("requests/rejected"),
      (state) => {
        state.loadingRequests = false;
        state.loadingRequestDialog = false;
      }
    );
  },
});

export const { clearRequestsAction } = requestsSlice.actions;
export default requestsSlice.reducer;
