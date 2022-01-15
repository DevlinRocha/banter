import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";

export interface ServerSettingsState {
  serverDropdownOpen: boolean;
  inviteFriendsOpen: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServerSettingsState = {
  serverDropdownOpen: false,
  inviteFriendsOpen: false,
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
  },
});

export const { setServerDropdownOpen, setInviteFriendsOpen } =
  userSettingsSlice.actions;

export const useServerSettingsState = () =>
  useAppSelector((state) => state.serverSettings);

export default userSettingsSlice.reducer;
