import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IProducts } from "../../interfaces";
import { addItemToShoppingCart } from "../../utils/Functions";

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
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;
export default cartSlice.reducer;
