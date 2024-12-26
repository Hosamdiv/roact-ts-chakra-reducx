import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginStore";
import cartSlice from "./features/CartSlice";
import globalSlice from "./features/globalSlice";
import networkSlice from "./features/NetworkMode";
import { useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ProductsApiSlice } from "./services/ProductsApiSlice";
const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    network: networkSlice,
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice,
    [ProductsApiSlice.reducerPath]: ProductsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([ProductsApiSlice.middleware]),
});







export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
