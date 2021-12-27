import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface SettingsState {
  userSettingsOpen: boolean;
  settings: "My Account" | "User Profile";
  logoutConfirmOpen: boolean;
  changeUsernameOpen: boolean;
  changeEmailOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: SettingsState = {
  userSettingsOpen: false,
  settings: "My Account",
  logoutConfirmOpen: false,
  changeUsernameOpen: false,
  changeEmailOpen: false,
  loading: "idle",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserSettingsOpen(state, action) {
      state.userSettingsOpen = action.payload;
      state.logoutConfirmOpen = false;
    },

    setSettings(state, action) {
      state.settings = action.payload;
    },

    setLogoutConfirmOpen(state, action) {
      state.logoutConfirmOpen = action.payload;
    },

    setChangeUsernameOpen(state, action) {
      state.changeUsernameOpen = action.payload;
    },

    setChangeEmailOpen(state, action) {
      state.changeEmailOpen = action.payload;
    },
  },
});

export const {
  setUserSettingsOpen,
  setSettings,
  setLogoutConfirmOpen,
  setChangeUsernameOpen,
  setChangeEmailOpen,
} = settingsSlice.actions;

export const useSettingsState = () => useAppSelector((state) => state.settings);

export default settingsSlice.reducer;
