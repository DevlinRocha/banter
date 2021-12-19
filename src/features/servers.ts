import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface ServerData {
  name: string;
  img: string;
  path: string;
  serverID: string;
}

export interface ChannelData {
  name: string;
  topic: string;
  path: string;
  channelID: string;
}

export interface MessageData {
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  date: string;
  timestamp: number;
  reactions: [];
  edited: boolean;
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
    img: "",
    path: "",
    serverID: "",
  },

  channel: {
    name: "",
    topic: "",
    path: "",
    channelID: "",
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
