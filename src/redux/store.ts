import { configureStore } from "@reduxjs/toolkit";
import serversReducer from "./servers";

export const store = configureStore({
  reducer: {
    servers: serversReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
