import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";
import { UserData } from "./user";

export interface ServerData {
  name: string;
  img: string;
  path: string;
  serverID: string;
  defaultChannel: string;
}

export interface ChannelData {
  name: string;
  topic: string;
  path: string;
  channelID: string;
}

export interface MessageData {
  content: string;
  userID: string;
  date: string;
  timestamp: number;
  reactions: [];
  edited: boolean;
}

export interface ServersState {
  servers: ServerData[];
  server: ServerData;
  channels: ChannelData[];
  channel: ChannelData;
  messages: MessageData[];
  members: UserData[];
  member: UserData;
  memberProfileCardOpen: boolean;
  memberProfileCardHeight: number | string;
  serverIDs: string[];
  memberIDs: string[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServersState = {
  servers: [],

  server: {
    name: "",
    img: "",
    path: "",
    serverID: "",
    defaultChannel: "",
  },

  channels: [],

  channel: {
    name: "",
    topic: "",
    path: "",
    channelID: "",
  },

  messages: [],
  members: [],

  member: {
    username: "",
    tag: "",
    avatar: "",
    about: "",
    banner: "",
    userID: "",
  },

  memberProfileCardOpen: false,
  memberProfileCardHeight: 0,
  serverIDs: [],
  memberIDs: [],
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

    setMembers(state, action) {
      state.members = action.payload;
    },

    setMember(state, action) {
      state.member = action.payload;
    },

    setMemberProfileCardOpen(state, action) {
      state.memberProfileCardOpen = action.payload;
    },

    setMemberProfileCardHeight(state, action) {
      state.memberProfileCardHeight = action.payload;
    },

    setServerIDs(state, action) {
      state.serverIDs = action.payload;
    },

    setMemberIDs(state, action) {
      state.memberIDs = action.payload;
    },

    resetServerState(state) {
      state.server = initialState.server;
      state.channels = initialState.channels;
      state.channel = initialState.channel;
      state.memberIDs = initialState.memberIDs;
      state.messages = initialState.messages;
    },
  },
});

export const {
  setServers,
  setServer,
  setChannels,
  setChannel,
  setMessages,
  setMembers,
  setMember,
  setMemberProfileCardOpen,
  setMemberProfileCardHeight,
  setServerIDs,
  setMemberIDs,
  resetServerState,
} = serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
