// GioHang/store.js

import { configureStore } from '@reduxjs/toolkit';
import ProductCart  from '../GioHang/cart'; 

export const Store = configureStore({
    reducer: {
      cart: ProductCart, 
    },
    devTools: process.env.NODE_ENV !== 'production', 
  });