import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface ServerData {
  name: string;
  path: string;
  // img: string; Add server images
  id: string;
}

export interface ChannelData {
  name: string;
  path: string;
  id: string;
}

export interface MessageData {
  content: string;
  date: string;
  edited: boolean;
  reactions: [];
  timestamp: number;

  user: {
    name: string;
    img: string;
  };
}

export interface ServersState {
  server: ServerData;
  servers: ServerData[];
  channel: ChannelData;
  channels: ChannelData[];
  messages: MessageData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServersState = {
  servers: [],

  server: {
    name: "",
    path: "",
    id: "",
    // img: "", Add server images
  },

  channel: {
    name: "",
    path: "",
    id: "",
  },

  channels: [],
  messages: [],
  loading: "idle",
};

export const serversSlice = createSlice({
  name: "servers",
  initialState,

  reducers: {
    setServers(state, action) {
      state.servers = action.payload;
    },

    setServer(state, action) {
      state.server = action.payload;
    },

    setChannels(state, action) {
      state.channels = action.payload;
    },

    setChannel(state, action) {
      state.channel = action.payload;
    },

    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setServers, setServer, setChannels, setChannel, setMessages } =
  serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
