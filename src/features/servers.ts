import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface ServerData {
  name: string;
  img: string;
  path: string;
  serverID: string;
  defaultChannel: string;
  roles: RoleData[];
  contentFilter: "off" | "low" | "medium" | "high";
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
  image: string;
  video: string;
}

export interface MemberData {
  userID: string;
  username: string;
  tag: string;
  avatar: string;
  about: string;
  banner: string;
  serverOwner: boolean | JSX.Element | null;
  roles: RoleData[];
  // permissions: [];
}

export interface MemberPreview {
  userID: string;
  username: string;
  avatar: string;
  serverOwner: boolean | JSX.Element | null;
  roles: RoleData[];
  permissions: [];
}

export interface MemberInfo {
  username: string;
  avatar: string;
  userID: string;
  serverOwner?: boolean | JSX.Element | null;
}

export interface MemberRole {
  userID: string;
  serverOwner: boolean | JSX.Element | null;
  roles: (string | RoleData)[];
  // permissions: PermissionsData;
}

export interface RoleData {
  name: string;
  color: string;
  separateDisplay: boolean;
  sort: number;
  permissions: PermissionsData;
  roleID: string;
}

export interface RoleListData extends RoleData {
  members: MemberData[];
}

export interface PermissionsData {
  manageChannels: boolean;
  manageRoles: boolean;
  manageServer: boolean;
}

export interface PositionData {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface MediaData {
  src: string;
  type: "image" | "video" | null;
}

export interface ServersState {
  servers: ServerData[];
  server: ServerData;
  channels: ChannelData[];
  channel: ChannelData;
  voiceChannel: ChannelData;
  messages: MessageData[];
  members: MemberData[];
  memberRoles: MemberRole[];
  member: MemberData;
  memberPreview: MemberPreview;
  memberProfileCardOpen: boolean;
  memberProfileCardPosition: PositionData;
  viewMediaOpen: boolean;
  viewMedia: MediaData;
  serverIDs: string[];
}

const initialState: ServersState = {
  servers: [],

  server: {
    name: "",
    img: "",
    path: "",
    serverID: "",
    defaultChannel: "",
    roles: [],
    contentFilter: "off",
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
    serverOwner: false,
    roles: [
      // permissions: PermissionsData;
    ],
    // permissions: [],
  },

  memberPreview: {
    userID: "",
    username: "",
    avatar: "",
    serverOwner: false,
    roles: [],
    permissions: [],
  },

  memberRoles: [],

  memberProfileCardOpen: false,
  memberProfileCardPosition: {},
  viewMediaOpen: false,
  viewMedia: {
    src: "",
    type: null,
  },
  serverIDs: [],
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

    setServerName(state, action) {
      state.server.name = action.payload;
    },

    setServerImage(state, action) {
      state.server.img = action.payload;
    },

    updateServerRole(state, action) {
      state.server.roles[action.payload.index] = action.payload.newRole;
    },

    setServerContentFilter(state, action) {
      state.server.contentFilter = action.payload;
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

    setMemberPreview(state, action) {
      state.memberPreview = action.payload;
    },

    setMemberProfileCardOpen(state, action) {
      state.memberProfileCardOpen = action.payload;
    },

    setMemberProfileCardPosition(state, action) {
      state.memberProfileCardPosition = action.payload;
    },

    setViewMediaOpen(state, action) {
      state.viewMediaOpen = action.payload;
    },

    setViewMedia(state, action) {
      state.viewMedia = action.payload;
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
  setServerName,
  setServerImage,
  updateServerRole,
  setServerContentFilter,
  setChannels,
  setChannel,
  setVoiceChannel,
  setMessages,
  setMembers,
  setMember,
  setMemberRoles,
  setMemberPreview,
  setMemberProfileCardOpen,
  setMemberProfileCardPosition,
  setViewMediaOpen,
  setViewMedia,
  setServerIDs,
  resetServerState,
} = serversSlice.actions;

export const useServersState = () => useAppSelector((state) => state.servers);

export default serversSlice.reducer;
