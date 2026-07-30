import { createSlice } from "@reduxjs/toolkit";
import productsData from "@/data/products.json";

/**
 * Products slice — seeded with local JSON so the UI is fully
 * functional before the real product API is wired up. Once
 * connected, `fetchProducts` in product.service.js should dispatch
 * these same reducers with live data.
 */
const initialState = {
  items: productsData,
  activeProductId: productsData[0]?.id ?? null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.status = "loading";
    },
    fetchProductsSuccess(state, action) {
      state.status = "succeeded";
      state.items = action.payload;
    },
    fetchProductsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    setActiveProduct(state, action) {
      state.activeProductId = action.payload;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setActiveProduct,
} = productsSlice.actions;
export default productsSlice.reducer;
