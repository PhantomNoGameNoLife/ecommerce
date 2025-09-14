import { Cart, CountProduct, ProductCart } from "@/types/cartRedux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AddToCart, GetUserCart } from "@/apis/cartApi";
import { getSession } from "next-auth/react";

const initialState: Cart = {
  loading: true,
  numOfCartItems: 0,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

// 🟢 Get User Cart
export const fetchCartHybrid = createAsyncThunk<Cart>(
  "cart/fetchCartHybrid",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        const products = localStorage.getItem("products");
        if (products) {
          return JSON.parse(products) as Cart;
        }
        return {
          loading: false,
          numOfCartItems: 0,
          data: { products: [], totalCartPrice: 0 },
        };
      }

      // if there a session
      const data = await GetUserCart();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// 🟢 Add To Cart Hybrid
export const addToCartHybrid = createAsyncThunk<Cart, ProductCart>(
  "cart/addToCartHybrid",
  async (product, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        // 🟡 Guest → save to localStorage
        const products = localStorage.getItem("products");
        const state: Cart = products
          ? JSON.parse(products)
          : {
              loading: false,
              numOfCartItems: 0,
              data: { products: [], totalCartPrice: 0 },
            };

        const existingProduct = state.data.products.find(
          (p) => p.id === product.id
        );
        if (existingProduct) {
          existingProduct.count += product.count;
        } else {
          state.data.products.push(product);
        }

        state.numOfCartItems += product.count;
        state.data.totalCartPrice += product.price * product.count;

        localStorage.setItem("products", JSON.stringify(state));
        return state;
      }

      // 🟢 Auth → call API
      const data = await AddToCart(product.id);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

function loadFromLocal(state: Cart) {
  const products = localStorage.getItem("products");
  if (products && state.numOfCartItems === 0) {
    const parsedState: Cart = JSON.parse(products);
    state.numOfCartItems = parsedState.numOfCartItems;
    state.data = parsedState.data;
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // if guest user ? remove product from localStroge
    removeFromCartLocal: (state, action: PayloadAction<{ id: string }>) => {
      // check first if there are products in localStorage and state is empty
      loadFromLocal(state);

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
      loadFromLocal(state);

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

        if (existingProduct.count === 0)
          state.data.products.splice(existingProductIndex, 1);
      }

      // update localStorage
      localStorage.setItem("products", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartHybrid.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartHybrid.fulfilled, (state, action) => {
        state.loading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
      })
      .addCase(addToCartHybrid.fulfilled, (state, action) => {
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  getCartLocal,
  addToCartLocal,
  removeFromCartLocal,
  clearCartLocal,
  changeProductCountLocal,
} = cartSlice.actions;

export default cartSlice.reducer;