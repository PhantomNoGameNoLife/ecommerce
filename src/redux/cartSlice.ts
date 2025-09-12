import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Cart {
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
  numOfCartItems: 0,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // if guest user ? add product to localStroge
    addToCartLocal: (state, action: PayloadAction<ProductCart>) => {
      // check first if there a products in local Storage
      const products = localStorage.getItem("products");
      if (products) {
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
  },
});

// Action creators are generated for each case reducer function
export const { addToCartLocal } = counterSlice.actions;

export default counterSlice.reducer;
