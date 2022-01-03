import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface AddServerState {
  addServerOpen: boolean;
  addServerWindow:
    | "Create Server"
    | "Join Server"
    | "About Server"
    | "Customize Server";
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: AddServerState = {
  addServerOpen: false,
  addServerWindow: "Create Server",
  loading: "idle",
};

export const addServerSlice = createSlice({
  name: "addServer",
  initialState,
  reducers: {
    setAddServerOpen(state, action) {
      state.addServerOpen = action.payload;
    },

    setAddServerWindow(state, action) {
      state.addServerWindow = action.payload;
    },
  },
});

export const { setAddServerOpen, setAddServerWindow } = addServerSlice.actions;

export const useAddServerState = () =>
  useAppSelector((state) => state.addServer);

export default addServerSlice.reducer;
