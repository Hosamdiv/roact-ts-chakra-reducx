import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginStore";
import cartSlice from "./features/CartSlice";
import globalSlice from "./features/globalSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: cartSlice,
    global: globalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
