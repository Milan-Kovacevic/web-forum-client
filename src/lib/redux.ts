import signInSlice from "@/redux/signin-slice";
import roomsSlice from "@/redux/rooms-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import identitySlice from "@/redux/identity-slice";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "identity",
  storage,
};

const persistedIdentityReducer = persistReducer(persistConfig, identitySlice);
const rootReducer = combineReducers({
  rooms: roomsSlice,
  signin: signInSlice,
  identity: persistedIdentityReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
export const persistedStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
