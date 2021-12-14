import { configureStore } from "@reduxjs/toolkit";
import serversReducer from "../features/servers";
import settingsReducer from "../features/settings";

export const store = configureStore({
  reducer: {
    servers: serversReducer,
    settings: settingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
