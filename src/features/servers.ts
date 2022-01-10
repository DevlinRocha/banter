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
  topic?: string;
  type: string;
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

export interface MemberData {
  username: string;
  avatar: string;
  userID: string;
}

export interface PositionData {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface ServersState {
  servers: ServerData[];
  server: ServerData;
  channels: ChannelData[];
  channel: ChannelData;
  voiceChannel: ChannelData;
  messages: MessageData[];
  members: MemberData[];
  memberID: string;
  member: UserData;
  memberProfileCardOpen: boolean;
  memberProfileCardPosition: PositionData;
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
    type: "text",
    path: "",
    channelID: "",
  },

  voiceChannel: {
    name: "",
    type: "voice",
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

  memberID: "",
  memberProfileCardOpen: false,
  memberProfileCardPosition: {},
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

    setVoiceChannel(state, action) {
      state.voiceChannel = action.payload;
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

    setMemberID(state, action) {
      state.memberID = action.payload;
    },

    setMemberProfileCardOpen(state, action) {
      state.memberProfileCardOpen = action.payload;
    },

    setMemberProfileCardPosition(state, action) {
      state.memberProfileCardPosition = action.payload;
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
      state.voiceChannel = initialState.voiceChannel;
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
  setVoiceChannel,
  setMessages,
  setMembers,
  setMember,
  setMemberID,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  setServerIDs,
  setMemberIDs,
  resetServerState,
} = serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
