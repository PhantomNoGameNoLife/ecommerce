import { Cart, ProductCart } from "@/types/cartRedux.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  GetUserCart,
  UpdateCartQuantity,
  RemoveCartItem,
  ClearCart,
} from "@/apis/cartApi";
import { getSession } from "next-auth/react";

const initialState: Cart & {
  error?: string | null;
  success?: string | null;
  actionCartLoading: boolean;
  loading: boolean;
} = {
  loading: true,
  actionCartLoading: true,
  numOfCartItems: 0,
  data: {
    products: [],
    totalCartPrice: 0,
  },
  error: null,
  success: null,
};

// Get User Cart
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

      const localData = localStorage.getItem("products");
      if (localData) {
        const localCart: Cart = JSON.parse(localData);

        for (const product of localCart.data.products) {
          for (let i = 0; i < product.count; i++) {
            await AddToCart(product.id);
          }
        }

        localStorage.removeItem("products");
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

// Add To Cart
export const addToCartHybrid = createAsyncThunk<Cart, ProductCart>(
  "cart/addToCartHybrid",
  async (product, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        // Guest → save to localStorage
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

      // Auth → call API
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

// Update Product Quantity
export const updateCartHybrid = createAsyncThunk<
  Cart,
  { id: string; count: number }
>("cart/updateCartHybrid", async ({ id, count }, { rejectWithValue }) => {
  try {
    const session = await getSession();
    if (!session) {
      const products = localStorage.getItem("products");
      const state: Cart = products
        ? JSON.parse(products)
        : {
            loading: false,
            numOfCartItems: 0,
            data: { products: [], totalCartPrice: 0 },
          };

      const product = state.data.products.find((p) => p.id === id);
      if (product) {
        state.numOfCartItems += count;
        product.count += count;
        state.data.totalCartPrice += product.price * count;

        if (product.count <= 0)
          state.data.products = state.data.products.filter((p) => p.id !== id);
      }

      localStorage.setItem("products", JSON.stringify(state));
      return state;
    }

    // Auth → call API
    const data = await UpdateCartQuantity(id, count);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue("Something went wrong");
  }
});

// Remove Product
export const removeFromCartHybrid = createAsyncThunk<Cart, string>(
  "cart/removeFromCartHybrid",
  async (id, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        const products = localStorage.getItem("products");
        const state: Cart = products
          ? JSON.parse(products)
          : {
              loading: false,
              numOfCartItems: 0,
              data: { products: [], totalCartPrice: 0 },
            };

        const product = state.data.products.find((p) => p.id === id);
        if (product) {
          state.numOfCartItems -= product.count;
          state.data.totalCartPrice -= product.price * product.count;
          state.data.products = state.data.products.filter((p) => p.id !== id);
        }

        localStorage.setItem("products", JSON.stringify(state));
        return state;
      }

      const data = await RemoveCartItem(id);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Something went wrong");
    }
  }
);

// Clear Cart
export const clearCartHybrid = createAsyncThunk<Cart>(
  "cart/clearCartHybrid",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        localStorage.removeItem("products");
        return {
          loading: false,
          numOfCartItems: 0,
          data: { products: [], totalCartPrice: 0 },
        };
      }

      const data = await ClearCart();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(fetchCartHybrid.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchCartHybrid.fulfilled, (state, action) => {
        state.loading = false;
        state.actionCartLoading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
      })
      .addCase(fetchCartHybrid.rejected, (state, action) => {
        state.loading = false;
        state.actionCartLoading = false;
        state.error = action.payload as string;
      })

      // Add To Cart
      .addCase(addToCartHybrid.pending, (state) => {
        state.actionCartLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(addToCartHybrid.fulfilled, (state, action) => {
        state.actionCartLoading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "The product has been added to the cart";
      })
      .addCase(addToCartHybrid.rejected, (state, action) => {
        state.actionCartLoading = false;
        state.error = action.payload as string;
      })

      // Update Cart
      .addCase(updateCartHybrid.pending, (state) => {
        state.actionCartLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateCartHybrid.fulfilled, (state, action) => {
        state.actionCartLoading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "Quantity updated successfully";
      })
      .addCase(updateCartHybrid.rejected, (state, action) => {
        state.actionCartLoading = false;
        state.error = action.payload as string;
      })

      // Remove Cart Item
      .addCase(removeFromCartHybrid.pending, (state) => {
        state.actionCartLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(removeFromCartHybrid.fulfilled, (state, action) => {
        state.actionCartLoading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "The product has been removed from the cart";
      })
      .addCase(removeFromCartHybrid.rejected, (state, action) => {
        state.actionCartLoading = false;
        state.error = action.payload as string;
      })

      // Clear Cart
      .addCase(clearCartHybrid.pending, (state) => {
        state.actionCartLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(clearCartHybrid.fulfilled, (state, action) => {
        state.actionCartLoading = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "The cart has been completely emptied ";
      })
      .addCase(clearCartHybrid.rejected, (state, action) => {
        state.actionCartLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStatus } = cartSlice.actions;
export default cartSlice.reducer;
