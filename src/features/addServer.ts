import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface AddServerState {
  addServerOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: AddServerState = {
  addServerOpen: false,
  loading: "idle",
};

export const addServerSlice = createSlice({
  name: "addServer",
  initialState,
  reducers: {
    setaddServerOpen(state, action) {
      state.addServerOpen = action.payload;
    },
  },
});

export const { setaddServerOpen } = addServerSlice.actions;

export const useAddServerState = () =>
  useAppSelector((state) => state.addServer);

export default addServerSlice.reducer;
