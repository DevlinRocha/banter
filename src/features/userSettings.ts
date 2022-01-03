import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface UserSettingsState {
  userSettingsOpen: boolean;
  userSettingsScreen: "My Account" | "User Profile";
  logoutConfirmOpen: boolean;
  changeUsernameOpen: boolean;
  changeEmailOpen: boolean;
  memberListOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserSettingsState = {
  userSettingsOpen: false,
  userSettingsScreen: "My Account",
  logoutConfirmOpen: false,
  changeUsernameOpen: false,
  changeEmailOpen: false,
  memberListOpen: true,
  loading: "idle",
};

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setUserSettingsOpen(state, action) {
      state.userSettingsOpen = action.payload;
      state.logoutConfirmOpen = false;
    },

    setUserSettingsScreen(state, action) {
      state.userSettingsScreen = action.payload;
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

    setMemberListOpen(state, action) {
      state.memberListOpen = action.payload;
    },
  },
});

export const {
  setUserSettingsOpen,
  setUserSettingsScreen,
  setLogoutConfirmOpen,
  setChangeUsernameOpen,
  setChangeEmailOpen,
  setMemberListOpen,
} = userSettingsSlice.actions;

export const useUserSettingsState = () =>
  useAppSelector((state) => state.userSettings);

export default userSettingsSlice.reducer;
