import { createSlice } from "@reduxjs/toolkit";
import { MutableRefObject } from "react";
import { useAppSelector } from "../redux/hooks";

export interface VoiceChatState {
  microphoneActive: boolean;
  peerConnection: RTCPeerConnection | null;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  localRef: MutableRefObject<HTMLAudioElement> | null;
  remoteRef: MutableRefObject<HTMLAudioElement> | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: VoiceChatState = {
  microphoneActive: false,
  peerConnection: null,
  localStream: null,
  remoteStream: null,
  localRef: null,
  remoteRef: null,
  loading: "idle",
};

export const voiceChatSlice = createSlice({
  name: "voiceChat",
  initialState,
  reducers: {
    setMicrophoneActive(state, action) {
      state.microphoneActive = action.payload;
    },

    setPeerConnection(state, action) {
      state.peerConnection = action.payload;
    },

    setLocalRef(state, action) {
      state.localRef = action.payload;
    },

    setRemoteRef(state, action) {
      state.remoteRef = action.payload;
    },

    setLocalStream(state, action) {
      state.localStream = action.payload;
    },

    setRemoteStream(state, action) {
      state.remoteStream = action.payload;
    },
  },
});

export const {
  setMicrophoneActive,
  setPeerConnection,
  setLocalRef,
  setRemoteRef,
  setLocalStream,
  setRemoteStream,
} = voiceChatSlice.actions;

export const useVoiceChatState = () =>
  useAppSelector((state) => state.voiceChat);

export default voiceChatSlice.reducer;
