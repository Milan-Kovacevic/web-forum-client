import roomsSlice from "@/redux/rooms/roomsSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import identitySlice from "@/redux/identity/identitySlice";
import persistStore from "redux-persist/es/persistStore";
import authSlice from "@/redux/identity/authSlice";
import roomDetailsSlice from "@/redux/rooms/roomDetailsSlice";
import manageRoomSlice from "@/redux/rooms/manageRoomSlice";
import requestsSlice from "@/redux/users/requestsSlice";
import usersSlice from "@/redux/users/usersSlice";
import manageUserSlice from "@/redux/users/manageUserSlice";

const persistConfig = {
  key: "identity",
  storage,
  blacklist: ["register"],
};

const persistedIdentityReducer = persistReducer(persistConfig, identitySlice);
const rootReducer = combineReducers({
  rooms: roomsSlice,
  roomDetails: roomDetailsSlice,
  auth: authSlice,
  identity: persistedIdentityReducer,
  manageRoom: manageRoomSlice,
  requests: requestsSlice,
  users: usersSlice,
  manageUser: manageUserSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
