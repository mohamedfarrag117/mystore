import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { CartState, Product } from "../types";

const getCartKey = (): string | null => {
  try {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      return `cart_${user.email}`;
    }
  } catch (e) {
    console.error("Failed to get cart key", e);
  }
  return null;
};

const loadCartFromStorage = (): CartState => {
  try {
    const key = getCartKey();
    if (key) {
      const cartData = localStorage.getItem(key);
      if (cartData) {
        return { cartItems: JSON.parse(cartData) };
      }
    }
  } catch (e) {
    console.error("Failed to load cart from localStorage", e);
  }
  return { cartItems: [] };
};

const saveCartToStorage = (state: CartState): void => {
  try {
    const key = getCartKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(state.cartItems));
    }
  } catch (e) {
    console.error("Failed to save cart to localStorage", e);
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadUserCart: (state) => {
      const loaded = loadCartFromStorage();
      state.cartItems = loaded.cartItems;
    },

    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.cartItems.find((p) => p.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
        toast.success("Quantity updated");
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
        toast.success("Added to cart");
      }
      saveCartToStorage(state);
    },

    increaseQty: (state, action: PayloadAction<number>) => {
      const existing = state.cartItems.find((p) => p.id === action.payload);

      if (existing) existing.quantity += 1;
      saveCartToStorage(state);
    },

    decreaseQty: (state, action: PayloadAction<number>) => {
      const existing = state.cartItems.find((p) => p.id === action.payload);

      if (existing) {
        existing.quantity -= 1;

        if (existing.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload,
          );
        }
      }
      saveCartToStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const existing = state.cartItems.find((p) => p.id === action.payload);

      if (existing) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload,
        );
        toast.error("Item removed from cart!");
      }
      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state);
    },

    resetCartState: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
  loadUserCart,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
