import { Wishlist, WishlistProduct } from "@/types/wishlist.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddToWishlist,
  GetUserWishlist,
  RemoveWishlistItem,
} from "@/apis/wishlistApi";
import { getSession } from "next-auth/react";

const emptyWishlist = (): Wishlist => ({
  status: "",
  count: 0,
  data: [],
});

const initialState: Wishlist & {
  wishLoading: boolean;
  actionWishlistLoading: string[];
  wishRemove: string[];
  wishError?: string | null;
  wishSuccess?: string | null;
} = {
  ...emptyWishlist(),
  wishLoading: true,
  actionWishlistLoading: [],
  wishRemove: [],
  wishError: null,
  wishSuccess: null,
};

// Get User Wishlist
export const fetchWishlistHybrid = createAsyncThunk<Wishlist>(
  "wishlist/fetchWishlistHybrid",
  async (_, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        const products = localStorage.getItem("wishProducts");
        if (products) return JSON.parse(products) as Wishlist;
        return emptyWishlist();
      }

      const localData = localStorage.getItem("wishProducts");
      if (localData) {
        const localWishlist: Wishlist = JSON.parse(localData);

        for (const product of localWishlist.data) {
          for (let i = 0; i < localWishlist.count; i++) {
            await AddToWishlist(product.id);
          }
        }

        localStorage.removeItem("wishProducts");
      }

      // if there a session
      const data = await GetUserWishlist();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// Add To Wishlist
export const addToWishlistHybrid = createAsyncThunk<Wishlist, WishlistProduct>(
  "wishlist/addToWishlistHybrid",
  async (product, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        // Guest → save to localStorage
        const products = localStorage.getItem("wishProducts");
        const state: Wishlist = products
          ? JSON.parse(products)
          : emptyWishlist();

        state.data.push(product);
        state.count += 1;

        localStorage.setItem("wishProducts", JSON.stringify(state));
        return state;
      }

      // Auth → call API
      await AddToWishlist(product.id);
      const data = await GetUserWishlist();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

// Remove Product
export const removeFromWishlistHybrid = createAsyncThunk<Wishlist, string>(
  "wishlist/removeFromWishlistHybrid",
  async (id, { rejectWithValue }) => {
    try {
      const session = await getSession();
      if (!session) {
        const products = localStorage.getItem("wishProducts");
        const state: Wishlist = products
          ? JSON.parse(products)
          : emptyWishlist();

        state.count -= 1;
        state.data = state.data.filter((p) => p.id !== id);

        localStorage.setItem("wishProducts", JSON.stringify(state));
        return state;
      }

      await RemoveWishlistItem(id);
      const data = await GetUserWishlist();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Something went wrong");
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishClearStatus: (state) => {
      state.wishError = null;
      state.wishSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Wishlist
      .addCase(fetchWishlistHybrid.pending, (state) => {
        state.wishLoading = true;
        state.wishError = null;
        state.wishSuccess = null;
      })
      .addCase(fetchWishlistHybrid.fulfilled, (state, action) => {
        state.wishLoading = false;
        state.count = action.payload.count;
        state.data = action.payload.data;
      })
      .addCase(fetchWishlistHybrid.rejected, (state, action) => {
        state.wishLoading = false;
        state.wishError = action.payload as string;
      })

      // Add To Wishlist
      .addCase(addToWishlistHybrid.pending, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionWishlistLoading.push(productId);
        state.wishError = null;
        state.wishSuccess = null;
      })
      .addCase(addToWishlistHybrid.fulfilled, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionWishlistLoading = state.actionWishlistLoading.filter(
          (id) => id !== productId
        );
        state.count = action.payload.count;
        state.data = action.payload.data;
        state.wishSuccess = "Product has been added to the Wishlist";
      })
      .addCase(addToWishlistHybrid.rejected, (state, action) => {
        const productId = action.meta.arg.id;
        state.actionWishlistLoading = state.actionWishlistLoading.filter(
          (id) => id !== productId
        );
        state.wishError = action.payload as string;
      })

      // Remove Wishlist Item
      .addCase(removeFromWishlistHybrid.pending, (state, action) => {
        const productId = action.meta.arg;
        state.wishRemove.push(productId);
        state.wishError = null;
        state.wishSuccess = null;
      })
      .addCase(removeFromWishlistHybrid.fulfilled, (state, action) => {
        const productId = action.meta.arg;
        state.wishRemove = state.wishRemove.filter((id) => id !== productId);
        state.count = action.payload.count;
        state.data = action.payload.data;
        state.wishSuccess = "Product has been removed from the Wishlist";
      })
      .addCase(removeFromWishlistHybrid.rejected, (state, action) => {
        const productId = action.meta.arg;
        state.wishRemove = state.wishRemove.filter((id) => id !== productId);
        state.wishError = action.payload as string;
      });
  },
});

export const { wishClearStatus } = wishlistSlice.actions;
export default wishlistSlice.reducer;
