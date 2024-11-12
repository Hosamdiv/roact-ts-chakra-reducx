import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProducts } from "../../interfaces";
import { addItemToShoppingCart } from "../../utils/Functions";
import { toaster } from "../../components/ui/toaster";

interface IProduct {
  cartProducts: IProducts[];
}

const initialState: IProduct = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProducts>) => {
      state.cartProducts = addItemToShoppingCart(
        state.cartProducts,
        action.payload
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
      toaster.create({
        title: "Your Cart is empty now.",
        type: "success",
        duration: 1000,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
