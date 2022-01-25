import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface SendGifState {
  sendGifOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: SendGifState = {
  sendGifOpen: false,
  loading: "idle",
};

export const sendGifSlice = createSlice({
  name: "sendGif",
  initialState,
  reducers: {
    setSendGifOpen(state, action) {
      state.sendGifOpen = action.payload;
    },
  },
});

export const { setSendGifOpen } = sendGifSlice.actions;

export const useSendGifState = () => useAppSelector((state) => state.sendGif);

export default sendGifSlice.reducer;
