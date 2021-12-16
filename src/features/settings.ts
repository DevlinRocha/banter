import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface SettingsState {
  userSettingsOpen: boolean;
  settings: "My Account" | "User Profile";
  logoutConfirmOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: SettingsState = {
  userSettingsOpen: false,
  settings: "My Account",
  logoutConfirmOpen: false,
  loading: "idle",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setUserSettingsOpen(state, action) {
      state.userSettingsOpen = action.payload;
    },

    setSettings(state, action) {
      state.settings = action.payload;
    },

    setLogoutConfirmOpen(state, action) {
      state.logoutConfirmOpen = action.payload;
    },
  },
});

export const { setUserSettingsOpen, setSettings, setLogoutConfirmOpen } =
  settingsSlice.actions;

export const useSettingsState = () => useAppSelector((state) => state.settings);

export default settingsSlice.reducer;
