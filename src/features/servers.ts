import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

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
  userID: string;
  username: string;
  tag: string;
  avatar: string;
  about: string;
  banner: string;
  serverOwner?: boolean;
  roles?: string[];
  permissions?: [];
}

export interface MemberInfo {
  username: string;
  avatar: string;
  userID: string;
  serverOwner?: JSX.Element;
}

export interface MemberRole {
  userID: string;
  serverOwner: boolean;
  roles: string[];
  permissions: [];
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
  members: MemberInfo[];
  memberRoles: MemberRole[];
  member: MemberData;
  memberProfileCardOpen: boolean;
  memberProfileCardPosition: PositionData;
  serverIDs: string[];
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

  memberRoles: [],

  memberProfileCardOpen: false,
  memberProfileCardPosition: {},
  serverIDs: [],
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

    setMemberRoles(state, action) {
      state.memberRoles = action.payload;
    },

    setMemberID(state, action) {
      state.member.userID = action.payload;
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

    resetServerState(state) {
      state.server = initialState.server;
      state.channels = initialState.channels;
      state.channel = initialState.channel;
      state.voiceChannel = initialState.voiceChannel;
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
  setMemberRoles,
  setMemberID,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  setServerIDs,
  resetServerState,
} = serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
