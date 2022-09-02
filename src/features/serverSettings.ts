import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";
import { PositionData, RoleData, ServerData } from "./servers";

export interface ServerSettingsState {
  serverDropdownOpen: boolean;
  inviteFriendsOpen: boolean;
  serverSettingsOpen: boolean;
  serverSettingsScreen: "Overview" | "Roles" | "Moderation";
  editRoleOpen: boolean;
  currentRole: RoleData;
  rolesCopy: RoleData[] | null;
  deleteServerConfirmOpen: boolean;
  serverChangesMade: boolean;
  serverIconPreview?: File;
  serverCopy: ServerData | null;
  createChannelOpen: boolean;
  assignRoleOpen: boolean;
  assignRolePosition: PositionData;
  assignRoleHeight: 256 | 78;
}

const initialState: ServerSettingsState = {
  serverDropdownOpen: false,
  inviteFriendsOpen: false,
  serverSettingsOpen: false,
  serverSettingsScreen: "Overview",
  editRoleOpen: false,
  currentRole: {
    name: "",
    color: "",
    separateDisplay: false,
    sort: 0,
    permissions: {
      manageChannels: false,
      manageRoles: false,
      manageServer: false,
    },
    roleID: "",
  },
  rolesCopy: null,
  deleteServerConfirmOpen: false,
  serverChangesMade: false,
  serverCopy: null,
  createChannelOpen: false,
  assignRoleOpen: false,
  assignRoleHeight: 78,
  assignRolePosition: {},
};

export const userSettingsSlice = createSlice({
  name: "serverSettings",
  initialState,
  reducers: {
    setServerDropdownOpen(state, action) {
      state.serverDropdownOpen = action.payload;
    },

    setInviteFriendsOpen(state, action) {
      state.inviteFriendsOpen = action.payload;
      state.serverDropdownOpen = false;
    },

    setServerSettingsOpen(state, action) {
      state.serverSettingsOpen = action.payload;
      state.serverDropdownOpen = false;
    },

    setServerSettingsScreen(state, action) {
      state.serverSettingsScreen = action.payload;
    },

    setEditRoleOpen(state, action) {
      state.editRoleOpen = action.payload;
    },

    setCurrentRole(state, action) {
      state.currentRole = action.payload;
    },

    setRolesCopy(state, action) {
      state.rolesCopy = action.payload;
    },

    setDeleteServerConfirmOpen(state, action) {
      state.deleteServerConfirmOpen = action.payload;
    },

    setServerChangesMade(state, action) {
      state.serverChangesMade = action.payload;
    },

    setServerIconPreview(state, action) {
      state.serverIconPreview = action.payload;
    },

    setServerCopy(state, action) {
      state.serverCopy = action.payload;
    },

    setCreateChannelOpen(state, action) {
      state.createChannelOpen = action.payload;
      state.serverDropdownOpen = false;
    },

    setAssignRoleOpen(state, action) {
      state.assignRoleOpen = action.payload;
    },

    setAssignRolePosition(state, action) {
      state.assignRolePosition = action.payload;
    },

    setAssignRoleHeight(state, action) {
      state.assignRoleHeight = action.payload;
    },
  },
});

export const {
  setServerDropdownOpen,
  setInviteFriendsOpen,
  setServerSettingsOpen,
  setServerSettingsScreen,
  setEditRoleOpen,
  setCurrentRole,
  setRolesCopy,
  setDeleteServerConfirmOpen,
  setServerChangesMade,
  setServerIconPreview,
  setServerCopy,
  setCreateChannelOpen,
  setAssignRoleOpen,
  setAssignRolePosition,
  setAssignRoleHeight,
} = userSettingsSlice.actions;

export const useServerSettingsState = () =>
  useAppSelector((state) => state.serverSettings);

export default userSettingsSlice.reducer;
