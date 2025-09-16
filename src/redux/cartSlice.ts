import { Cart, Product } from "@/types/cart.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToCart,
  GetUserCart,
  UpdateCartQuantity,
  RemoveCartItem,
  ClearCart,
} from "@/apis/cartApi";
import { getSession } from "next-auth/react";

const emptyCart = (): Cart => ({
  status: "",
  cartId: "",
  numOfCartItems: 0,
  data: {
    _id: "",
    cartOwner: "",
    products: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
    totalCartPrice: 0,
  },
});

const initialState: Cart & {
  loading: boolean;
  actionCartLoading: string[];
  remove: string[];
  error?: string | null;
  success?: string | null;
  clear: boolean;
} = {
  ...emptyCart(),
  loading: true,
  actionCartLoading: [],
  remove: [],
  error: null,
  success: null,
  clear: false,
};

// Get User Cart
export const fetchCartHybrid = createAsyncThunk<Cart>(
  "cart/fetchCartHybrid",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        const products = localStorage.getItem("products");
        if (products) return JSON.parse(products) as Cart;
        return emptyCart();
      }

      const localData = localStorage.getItem("products");
      if (localData) {
        const localCart: Cart = JSON.parse(localData);

        for (const product of localCart.data.products) {
          for (let i = 0; i < product.count; i++) {
            await AddToCart(product.product.id);
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
export const addToCartHybrid = createAsyncThunk<Cart, Product>(
  "cart/addToCartHybrid",
  async (product, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        // Guest → save to localStorage
        const products = localStorage.getItem("products");
        const state: Cart = products ? JSON.parse(products) : emptyCart();

        const existingProduct = state.data.products.find(
          (p) => p.product.id === product.product.id
        );
        if (existingProduct) {
          existingProduct.count += product.count;
        } else {
          state.data.products.push(product);
          state.numOfCartItems += 1;
        }

        state.data.totalCartPrice += product.price * product.count;

        localStorage.setItem("products", JSON.stringify(state));
        return state;
      }

      // Auth → call API
      await AddToCart(product.product.id);
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

// Update Product Quantity
export const updateCartHybrid = createAsyncThunk<
  Cart,
  { id: string; count: number }
>("cart/updateCartHybrid", async ({ id, count }, { rejectWithValue }) => {
  try {
    const session = await getSession();
    if (!session) {
      const products = localStorage.getItem("products");
      const state: Cart = products ? JSON.parse(products) : emptyCart();

      const product = state.data.products.find((p) => p.product.id === id);
      if (product) {
        product.count += count;
        state.data.totalCartPrice += product.price * count;

        if (product.count <= 0) {
          state.data.products = state.data.products.filter(
            (p) => p.product.id !== id
          );
          state.numOfCartItems -= 1;
        }
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
        const state: Cart = products ? JSON.parse(products) : emptyCart();

        const product = state.data.products.find((p) => p.product.id === id);
        if (product) {
          state.numOfCartItems -= 1;
          state.data.totalCartPrice -= product.price * product.count;
          state.data.products = state.data.products.filter(
            (p) => p.product.id !== id
          );
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
        return emptyCart();
      }

      await ClearCart();
      return emptyCart();
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

    clearCart: (state) => {
      Object.assign(state, {
        ...emptyCart(),
        loading: false,
        actionCartLoading: [],
        remove: [],
        error: null,
        success: null,
        clear: false,
      });
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
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
      })
      .addCase(fetchCartHybrid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add To Cart
      .addCase(addToCartHybrid.pending, (state, action) => {
        const productId = action.meta.arg.product.id;
        state.actionCartLoading.push(productId);
        state.error = null;
        state.success = null;
      })
      .addCase(addToCartHybrid.fulfilled, (state, action) => {
        const productId = action.meta.arg.product.id;
        state.actionCartLoading = state.actionCartLoading.filter(
          (id) => id !== productId
        );
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "Product has been added to the cart";
      })
      .addCase(addToCartHybrid.rejected, (state, action) => {
        const productId = action.meta.arg.product.id;
        state.actionCartLoading = state.actionCartLoading.filter(
          (id) => id !== productId
        );
        state.error = action.payload as string;
      })

      // Update Cart
      .addCase(updateCartHybrid.pending, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionCartLoading.push(productId);
        state.error = null;
        state.success = null;
      })
      .addCase(updateCartHybrid.fulfilled, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionCartLoading = state.actionCartLoading.filter(
          (id) => id !== productId
        );
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "Quantity updated successfully";
      })
      .addCase(updateCartHybrid.rejected, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionCartLoading = state.actionCartLoading.filter(
          (id) => id !== productId
        );
        state.error = action.payload as string;
      })

      // Remove Cart Item
      .addCase(removeFromCartHybrid.pending, (state, action) => {
        const productId = action.meta.arg;
        state.remove.push(productId);
        state.error = null;
        state.success = null;
      })
      .addCase(removeFromCartHybrid.fulfilled, (state, action) => {
        const productId = action.meta.arg;
        state.remove = state.remove.filter((id) => id !== productId);
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "Product has been removed from the cart";
      })
      .addCase(removeFromCartHybrid.rejected, (state, action) => {
        const productId = action.meta.arg;
        state.remove = state.remove.filter((id) => id !== productId);
        state.error = action.payload as string;
      })

      // Clear Cart
      .addCase(clearCartHybrid.pending, (state) => {
        state.clear = true;
        state.error = null;
        state.success = null;
      })
      .addCase(clearCartHybrid.fulfilled, (state, action) => {
        state.clear = false;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
        state.success = "The cart has been completely emptied ";
      })
      .addCase(clearCartHybrid.rejected, (state, action) => {
        state.clear = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStatus , clearCart } = cartSlice.actions;
export default cartSlice.reducer;
