import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Cart {
  loading: boolean;
  numOfCartItems: number;
  data: Data;
}

export interface Data {
  products: ProductCart[];
  totalCartPrice: number;
}

export interface ProductCart {
  id: string;
  count: number;
  title: string;
  price: number;
  image: string;
}

const initialState: Cart = {
  loading: true,
  numOfCartItems: 0,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

export interface CountProduct {
  id: string;
  count: number;
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // if guest user ? get cart from localStorage
    getCartLocal: (state) => {
      const products = localStorage.getItem("products");
      if (products) {
        const parsedState: Cart = JSON.parse(products);
        state.numOfCartItems = parsedState.numOfCartItems;
        state.data = parsedState.data;
      }
      state.loading = false
    },

    // if guest user ? add product to localStroge
    addToCartLocal: (state, action: PayloadAction<ProductCart>) => {
      // check first if there a products in local Storage and state there is no state
      const products = localStorage.getItem("products");
      if (products && state.numOfCartItems === 0) {
        const parsedState: Cart = JSON.parse(products);
        state.numOfCartItems = parsedState.numOfCartItems;
        state.data = parsedState.data;
      }

      // handle state data
      state.numOfCartItems += 1;
      const existingProduct = state.data.products.find(
        (p) => p.id === action.payload.id
      );
      if (!existingProduct) state.data.products.push(action.payload);
      else existingProduct.count += 1;
      state.data.totalCartPrice += action.payload.price;

      //add products to localStroge
      localStorage.setItem("products", JSON.stringify(state));
    },

    // if guest user ? remove product from localStroge
    removeFromCartLocal: (state, action: PayloadAction<{ id: string }>) => {
      // check first if there are products in localStorage and state is empty
      const products = localStorage.getItem("products");
      if (products && state.numOfCartItems === 0) {
        const parsedState: Cart = JSON.parse(products);
        state.numOfCartItems = parsedState.numOfCartItems;
        state.data = parsedState.data;
      }

      // handle state data
      const existingProductIndex = state.data.products.findIndex(
        (p) => p.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.data.products[existingProductIndex];

        // update cart numbers
        state.numOfCartItems -= existingProduct.count;
        state.data.totalCartPrice -=
          existingProduct.price * existingProduct.count;

        state.data.products.splice(existingProductIndex, 1);
      }

      // update localStorage
      localStorage.setItem("products", JSON.stringify(state));
    },

    // if guest user ? remove all product from localStroge
    clearCartLocal: (state) => {
      state.numOfCartItems = 0;
      state.data = {
        products: [],
        totalCartPrice: 0,
      };
      localStorage.removeItem("products");
    },

    // if guest user ? change product count in localStroge
    changeProductCountLocal: (state, action: PayloadAction<CountProduct>) => {
      // check first if there are products in localStorage and state is empty
      const products = localStorage.getItem("products");
      if (products && state.numOfCartItems === 0) {
        const parsedState: Cart = JSON.parse(products);
        state.numOfCartItems = parsedState.numOfCartItems;
        state.data = parsedState.data;
      }

      // handle state data
      const existingProductIndex = state.data.products.findIndex(
        (p) => p.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.data.products[existingProductIndex];

        // update cart numbers
        state.numOfCartItems += action.payload.count;
        state.data.totalCartPrice +=
          existingProduct.price * action.payload.count;
        existingProduct.count += action.payload.count;
      }

      // update localStorage
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCartLocal,
  addToCartLocal,
  removeFromCartLocal,
  clearCartLocal,
  changeProductCountLocal,
} = counterSlice.actions;

export default counterSlice.reducer;
