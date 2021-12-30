/* eslint-disable no-param-reassign */
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface Currency {
  label: string;
  symbol: string;
}

interface Price {
  currency: Currency;
  amount: number;
}

interface Attribute {
  displayValue?: string;
  value?: string;
  id: string;
}

interface AttributeSet {
  id: string;
  name?: string;
  type?: string;
  items: Attribute[];
}

export interface Product {
  id: string;
  name: string;
  inStock?: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: [AttributeSet];
  prices: Price[];
  brand: string;
  selectedAttribute?: string;
}

export const counterSlice = createSlice({
  name: 'appConfigurations',
  initialState: {
    currency: { label: 'USD', symbol: '$' },
    cart: (JSON.parse(localStorage.getItem('productsInCart') || 'null') || []) as Product[],
    darkBackground: false,
    productsCategory: 'all',
  },
  reducers: {
    changeCurrency: (
      state,
      action: PayloadAction<{
        label: string;
        symbol: string;
      }>
    ) => {
      state.currency.label = action.payload.label;
      state.currency.symbol = action.payload.symbol;
    },
    addProductInCart: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteProductFromCart: (state, action) => {
      const index = state.cart.reverse().findIndex(item => item.id === action.payload.id);
      state.cart = state.cart.filter((_, elIndex) => index !== elIndex).reverse();
    },
    changeBackgroundColor: state => {
      state.darkBackground = !state.darkBackground;
    },
    changeProductsCategories: (state, action: PayloadAction<string>) => {
      state.productsCategory = action.payload;
    },
  },
});

export const {
  changeCurrency,
  addProductInCart,
  deleteProductFromCart,
  changeBackgroundColor,
  changeProductsCategories,
} = counterSlice.actions;

const store = configureStore({
  reducer: {
    appConfigurations: counterSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
