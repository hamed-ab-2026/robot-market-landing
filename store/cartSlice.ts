import type {PayloadAction} from '@reduxjs/toolkit';
import type {CartProduct, CartState} from '@/types/domain';
import type {RootState} from './store';
import { createSlice } from '@reduxjs/toolkit';

const initialState: CartState = {
  items: [], // { id, name, priceNumeric, priceLabel, qty, image }
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
      state.isDrawerOpen = true;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setQuantity: (state, action: PayloadAction<{id: string; qty: number}>) => {
      const { id, qty } = action.payload;
      if (!Number.isSafeInteger(qty) || qty < 1) return;
      const item = state.items.find((item) => item.id === id);
      if (item) item.qty = qty;
    },
    incrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.qty += 1;
    },
    decrementQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else if (item) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setQuantity,
  incrementQty,
  decrementQty,
  clearCart,
  openDrawer,
  closeDrawer,
  toggleDrawer,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.qty * item.priceNumeric, 0);
export const selectIsDrawerOpen = (state: RootState) => state.cart.isDrawerOpen;

export default cartSlice.reducer;
