import { createSlice, configureStore, isAllOf } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'appConfigurations',
  initialState: {
    currency: 'USD',
    cart: [],
    darkBackground: false,
    productsCategory: 'all',
  },
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
    addProductInCart: (state, action) => {
      state.cart.push(action.payload);
    },
    changeBackgroundColor: state => {
      state.darkBackground = !state.darkBackground;
    },
    changeProductsCategories: (state, action) => {
      state.productsCategory = action.payload;
    },
  },
});

export const { changeCurrency, addProductInCart, changeBackgroundColor, changeProductsCategories } =
  counterSlice.actions;

export default configureStore({
  reducer: {
    appConfigurations: counterSlice.reducer,
  },
});
