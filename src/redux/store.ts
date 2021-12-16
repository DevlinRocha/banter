import { configureStore } from "@reduxjs/toolkit";
import serversReducer from "../features/servers";
import settingsReducer from "../features/settings";
import userReducer from "../features/user";

export const store = configureStore({
  reducer: {
    servers: serversReducer,
    settings: settingsReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
