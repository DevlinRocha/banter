import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface SendGifState {
  sendGifOpen: boolean;
}

const initialState: SendGifState = {
  sendGifOpen: false,
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
