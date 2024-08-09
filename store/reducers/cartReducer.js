import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
  },
  reducers: {
    addCartItem: (state, action) => {
      const {dish} = action.payload;

      const existingItem = state.cartItems.find((item) => item._id === dish._id);
      if (existingItem) {
        throw new Error("Product already exists in the cart");
      } else {
        state.cartItems.push({ ...dish, quantity: 1 });
        state.totalQuantities += 1;
        state.totalPrice += dish.price;
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { id, value } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item._id === id);

      if (itemToUpdate) {
        if (value === 'inc') {
          itemToUpdate.quantity += 1;
          state.totalPrice += itemToUpdate.price;
        } else if (value === 'dec' && itemToUpdate.quantity > 1) {
          itemToUpdate.quantity -= 1;
          state.totalPrice -= itemToUpdate.price;
        }
      }
    },
    incrementQuantity: (state, action) => {
      const { id } = action.payload;
      const itemToIncrement = state.cartItems.find((item) => item._id === id);

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
    removeCartItem: (state, action) => {
      const { product } = action.payload;
      const itemToRemove = state.cartItems.find(
        (item) => item._id === product._id,
      );

      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.totalQuantities -= 1;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== product?._id,
        );
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
  clearCart,
  addCartItem,
  incrementQuantity,
  decrementQuantity,
  removeCartItem,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
