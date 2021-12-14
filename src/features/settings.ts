import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs } from "firebase/firestore";
import { useAppSelector } from "../redux/hooks";
import { db, User } from "../../firebase";

export interface SettingsState {
  userSettingsOpen: boolean;
  settings: "My Account" | "User Profile";
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: SettingsState = {
  userSettingsOpen: false,
  settings: "My Account",
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
  },

  extraReducers: (builder) => {},
});

export const { setUserSettingsOpen, setSettings } = settingsSlice.actions;

export const useSettingsState = () => useAppSelector((state) => state.settings);

export default settingsSlice.reducer;
