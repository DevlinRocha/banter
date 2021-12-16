import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { query, collection, getDocs } from "firebase/firestore";
import { useAppSelector } from "../redux/hooks";
import { db, User } from "../../firebase";

export interface UserState {
  user: {
    name: string;
    img: string;
    id: string;
  };
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: {
    name: "Anonymous",
    img: "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/Account.png?alt=media&token=32d8543b-cc91-4006-b014-ab93d128441a",
    id: "0000",
  },
  loading: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const useUserState = () => useAppSelector((state) => state.user);

export default userSlice.reducer;
