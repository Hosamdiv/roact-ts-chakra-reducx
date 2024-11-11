import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IGlobal {
  isOpenCartDrawer: boolean;
  onOpenCartDrawer: boolean;
  onCloseCartDrawer: boolean;
}

const initialState: IGlobal = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    onOpenCartDrawerAction: (state) => {
      state.isOpenCartDrawer = true;
      state.onOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.isOpenCartDrawer = false;
      state.onOpenCartDrawer = false;
    },
  },
});

export const { onOpenCartDrawerAction, onCloseCartDrawerAction } =
  globalSlice.actions;
export const selectGlobal = (state: RootState) => state.global;
export default globalSlice.reducer;
