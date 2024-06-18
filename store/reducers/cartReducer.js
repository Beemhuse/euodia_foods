// src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0, // Total count of different items
    qty: 1, // Separate quantity field
  },
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    toggleCartItemQuantity: (state, action) => {
      const { id, value, product, quantity } = action.payload;
      const itemToToggle = state.cartItems.find((item) => item._id === id);

      if (!itemToToggle) {
        // If item is not in the cart, add it to the cartItems and increment totalQuantities
        state.cartItems.push({ ...product, quantity });
        state.totalQuantities += quantity;
      } else {
        // If item exists, update its quantity without changing totalQuantities
        if (value === 'inc') {
          itemToToggle.quantity += quantity;
        } else if (value === 'dec' && itemToToggle.quantity > 1) {
          itemToToggle.quantity -= quantity;
        }
      }

      // Update total price
      state.totalPrice += product.price * quantity;
    },

    addCartItem: (state, action) => {
      const { product, quantity } = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item._id === product._id,
      );

      if (!existingItem) {
        // If item does not exist, add it to cartItems and increment totalQuantities
        state.cartItems.push({ ...product, quantity });
        state.totalQuantities += 1;
      } else {
      }

      // Update total price
      // state.totalPrice += product.price * quantity;
      state.totalPrice += product.price * (existingItem ? 0 : quantity);
    },
    removeCartItem: (state, action) => {
      const { product } = action.payload;
      const itemToRemove = state.cartItems.find(
        (item) => item?._id === product?._id,
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.totalQuantities -= 1; // Decrement totalQuantities when an item is removed
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product._id,
        );

        // If cartItems is now empty, reset totalPrice to 0
        if (state.cartItems.length === 0) {
          state.totalPrice = 0;
        }
      }
    },

    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      const itemToIncrement = state.cartItems.find((item) => item?._id === id);
      console.log(itemToIncrement);

      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
        state.totalPrice += itemToIncrement.price;
      }
    },
    decrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToDecrement = state.cartItems.find((item) => item._id === id);

      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        state.totalPrice -= itemToDecrement.price;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalQuantities = 0;
    },
  },
});

export const {
  toggleCart,
  clearCart,
  addCartItem,
  removeCartItem,
  toggleCartItemQuantity,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
