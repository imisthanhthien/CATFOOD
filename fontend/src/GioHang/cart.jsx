import { createSlice } from '@reduxjs/toolkit';

export const ProductCart = createSlice({
  name: 'cart',
  initialState: {
    CartArr: JSON.parse(localStorage.getItem('cart')) || [], // Lấy giỏ hàng từ localStorage nếu có
  },
  reducers: {
    AddProduct: (state, action) => {
      const productIndex = state.CartArr.findIndex((p) => p.id === action.payload.id);
      if (productIndex === -1) {
        state.CartArr.push({ ...action.payload, quantity: action.payload.quantity });
      } else {
        state.CartArr[productIndex].quantity += action.payload.quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.CartArr));
    },
    DeleteProduct: (state, action) => {
      const productId = action.payload.id;
      state.CartArr = state.CartArr.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state.CartArr));
    },
    UpdateProductQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const productIndex = state.CartArr.findIndex((p) => p.id === id);
      if (productIndex !== -1) {
        state.CartArr[productIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(state.CartArr));
      }
    },
    ClearCart: (state) => {
      state.CartArr = [];
      localStorage.setItem('cart', JSON.stringify(state.CartArr));
    },
  },
});

export const { AddProduct, DeleteProduct, UpdateProductQuantity, ClearCart } = ProductCart.actions;
export default ProductCart.reducer;
