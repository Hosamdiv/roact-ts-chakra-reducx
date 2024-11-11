import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IProducts {
  id: number;
  price: number;
  thumbnail: string;
  title: string;
  qty?: number;
}

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
      state.cartProducts = [...state.cartProducts, action.payload];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart; // Corrected to access the cart state properly
export default cartSlice.reducer;
