import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  query,
  collection,
  getDocs,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

import { db } from "../../firebase";

export interface Server {
  name: string;
  path: string;
  // img: string; Add server images
  id: string;
}

export interface Channel {
  name: string;
  path: string;
  id: string;
}

export interface MessageData {
  content: string;
  date: string;
  edited: boolean;
  reactions: [];
  timestamp: number;
  user: {
    name: string;
    img: string;
  };
}

export interface ServersState {
  server: Server;
  servers: Server[];
  channel: Channel;
  channels: Channel[];
  messages: DocumentData[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ServersState = {
  servers: [],
  server: {
    name: "",
    path: "",
    id: "",
    // img: "", Add server images
  },
  channel: {
    name: "",
    path: "",
    id: "",
  },
  channels: [],
  messages: [],
  loading: "idle",
};

export const getServers = createAsyncThunk("servers/getServers", async () => {
  const serverList: Server[] = [];
  const q = query(collection(db, "servers"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const server: Server = {
      name: doc.data().name,
      path: `/channels/${doc.id}/`,
      id: doc.id,
    };
    serverList.push(server);
  });
  return serverList;
});

export const getChannels = createAsyncThunk(
  "servers/getChannels",
  async (blank, { getState }) => {
    const { servers } = getState() as { servers: ServersState };
    const channelList: Channel[] = [];
    const q = query(collection(db, "servers", servers.server.id, "channels"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const channel: Channel = {
        name: doc.data().name,
        path: `${servers.server.path}${doc.id}/`,
        id: doc.id,
      };
      channelList.push(channel);
    });
    return channelList;
  }
);

export const fetchMessages = createAsyncThunk(
  "servers/fetchMessages",
  async (blank, { getState }) => {
    const { servers } = getState() as { servers: ServersState };

    const q = query(
      collection(
        db,
        "servers",
        servers.server.id,
        "channels",
        servers.channel.id,
        "messages"
      )
    );
    const messageList: DocumentData[] = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // const message: MessageData = {
        //   content: doc.data().content,
        //   date: doc.data().date,
        //   edited: doc.data().edited,
        //   reactions: doc.data().reactions,
        //   timestamp: doc.data().timestamp,
        //   user: {
        //     name: doc.data().user.name,
        //     img: doc.data().user.img,
        //   },
        // };
        messageList.push(doc.data());
      });
    });
    return messageList;
  }
);

export const serversSlice = createSlice({
  name: "servers",
  initialState,
  reducers: {
    setServer(state, action) {
      state.server = action.payload;
    },
    setChannel(state, action) {
      state.channel = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getServers.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getServers.fulfilled, (state, action) => {
      state.servers = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(getChannels.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getChannels.fulfilled, (state, action) => {
      state.channels = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchMessages.pending, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.loading = "succeeded";
    });
  },
});

export const { setServer, setChannel } = serversSlice.actions;

export default serversSlice.reducer;
