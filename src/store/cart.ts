import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface cartItem {
  title: string;
  id: number;
  quantity: number;
  img: string;
  price: number;
}

export interface cartState {
  products: cartItem[],
  total: number;
  quantity: number;
}

const initialState: cartState = {
  products: [],
  total: 0,
  quantity: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      const item = state.products.find(item => item.id === action.payload.id);
      item ? item.quantity += action.payload.quantity : state.products.push(action.payload);

      state.total += (action.payload.quantity * action.payload.price);
      state.quantity += action.payload.quantity;

    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemToBeRemoved = state.products.find(item => item.id === action.payload);

      if (itemToBeRemoved) {
        if (itemToBeRemoved.quantity === 1) {
          state.products = state.products.filter(item => item.id !== action.payload);
        } else {
          itemToBeRemoved.quantity -= 1;
        }
        state.quantity -= 1;
        state.total -= itemToBeRemoved.price;
      }
    },

    resetCart: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;