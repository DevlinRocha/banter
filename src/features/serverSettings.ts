import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface ServerSettingsState {
  serverDropdownOpen: boolean;
  inviteFriendsOpen: boolean;
  serverSettingsOpen: boolean;
  serverSettingsScreen: "Overview";
  deleteServerConfirmOpen: boolean;
  serverChangesMade: boolean;
  createChannelOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServerSettingsState = {
  serverDropdownOpen: false,
  inviteFriendsOpen: false,
  serverSettingsOpen: false,
  serverSettingsScreen: "Overview",
  deleteServerConfirmOpen: false,
  serverChangesMade: false,
  createChannelOpen: false,
  loading: "idle",
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

    setDeleteServerConfirmOpen(state, action) {
      state.deleteServerConfirmOpen = action.payload;
    },

    setServerChangesMade(state, action) {
      state.serverChangesMade = action.payload;
    },

    setCreateChannelOpen(state, action) {
      state.createChannelOpen = action.payload;
      state.serverDropdownOpen = false;
    },
  },
});

export const {
  setServerDropdownOpen,
  setInviteFriendsOpen,
  setServerSettingsOpen,
  setServerSettingsScreen,
  setDeleteServerConfirmOpen,
  setServerChangesMade,
  setCreateChannelOpen,
} = userSettingsSlice.actions;

export const useServerSettingsState = () =>
  useAppSelector((state) => state.serverSettings);

export default userSettingsSlice.reducer;
