import { configureStore } from "@reduxjs/toolkit";
import serversReducer from "../features/servers";
import settingsReducer from "../features/userSettings";
import userReducer from "../features/user";
import addServerReducer from "../features/addServer";

export const store = configureStore({
  reducer: {
    servers: serversReducer,
    userSettings: settingsReducer,
    user: userReducer,
    addServer: addServerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
