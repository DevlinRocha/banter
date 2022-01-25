import { configureStore } from "@reduxjs/toolkit";
import serversReducer from "../features/servers";
import userSettingsReducer from "../features/userSettings";
import userReducer from "../features/user";
import addServerReducer from "../features/addServer";
import serverSettingsReducer from "../features/serverSettings";
import sendGifReducer from "../features/sendGif";

export const store = configureStore({
  reducer: {
    servers: serversReducer,
    userSettings: userSettingsReducer,
    serverSettings: serverSettingsReducer,
    user: userReducer,
    addServer: addServerReducer,
    sendGif: sendGifReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
