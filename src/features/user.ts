import { createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../redux/hooks";
import { MemberRole } from "./servers";

export interface UserData {
  username: string;
  tag: string;
  avatar: string;
  about: string;
  banner: string;
  userID: string;
  email?: string;
  serverOwner: boolean | JSX.Element | null;
  roles: MemberRole;
}

export interface UserState {
  user: UserData;
  avatarPreview?: File;
}

const initialState: UserState = {
  user: {
    username: "",
    tag: "",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/Account.png?alt=media&token=32d8543b-cc91-4006-b014-ab93d128441a",
    about: "",
    banner: "",
    userID: "",
    email: "",
    serverOwner: false,
    roles: {
      userID: "",
      serverOwner: false,
      roles: [],
    },
    // permissions: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setUserAbout(state, action) {
      state.user.about = action.payload;
    },

    setUserBanner(state, action) {
      state.user.banner = action.payload;
    },

    setUserAvatar(state, action) {
      state.user.avatar = action.payload;
    },

    setUserAvatarPreview(state, action) {
      state.avatarPreview = action.payload;
    },

    resetUserState(state) {
      state.user.username = initialState.user.username;
      state.user.tag = initialState.user.tag;
      state.user.avatar = initialState.user.avatar;
      state.user.about = initialState.user.about;
      state.user.userID = initialState.user.userID;
      state.user.email = initialState.user.email;
    },
  },
});

export const {
  setUser,
  setUserAbout,
  setUserBanner,
  setUserAvatar,
  setUserAvatarPreview,
  resetUserState,
} = userSlice.actions;

export const useUserState = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
