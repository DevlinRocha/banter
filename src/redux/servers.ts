import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export interface ServerList {
  path: string;
  name: string;
}

export interface ServersState {
  servers: ServerList[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServersState = {
  servers: [],
  loading: "idle",
};

export const getServers = createAsyncThunk("servers/getServers", async () => {
  let serverList: ServerList[] = [];
  const q = query(collection(db, "servers"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const server = {
      path: `/channels/${doc.id}/`,
      name: doc.data().name,
    };
    serverList.push(server);
  });
  return serverList;
});

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServers.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getServers.fulfilled, (state, action) => {
      state.servers = action.payload;
      state.loading = "succeeded";
    });
  },
});

export default serversSlice.reducer;
