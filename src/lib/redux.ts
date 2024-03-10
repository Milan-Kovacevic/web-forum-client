import roomSlice from "@/redux/rooms/roomSlice";
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

const persistConfig = {
  key: "identity",
  storage,
  blacklist: ["register"],
};

const persistedIdentityReducer = persistReducer(persistConfig, identitySlice);
const rootReducer = combineReducers({
  rooms: roomSlice,
  auth: authSlice,
  identity: persistedIdentityReducer,
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
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
