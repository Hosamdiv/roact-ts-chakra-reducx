import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface INetworkMode {
  isOnline: boolean;
}

const initialState: INetworkMode = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    networkMode: (state, action: { payload: boolean }) => {
      state.isOnline = action.payload;
    },
  },
});

export const { networkMode } = networkSlice.actions;
export const selectNetwork = (state: RootState) => state.network.isOnline;

export default networkSlice.reducer;
