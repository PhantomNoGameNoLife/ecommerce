import { Orders } from "@/types/orders.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserOrders } from "@/apis/ordersApi";

const initialState: {
  data: Orders;
  orderLoading: boolean;
  orderError?: string | null;
  orderSuccess?: string | null;
} = {
  data: [],
  orderLoading: true,
  orderError: null,
  orderSuccess: null,
};

// Get User Orders
export const fetchOrders = createAsyncThunk<Orders>(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await GetUserOrders();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrdersStatus: (state) => {
      state.orderError = null;
      state.orderSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
        state.orderSuccess = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.data = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = action.payload as string;
      });
  },
});

export const { resetOrdersStatus } = ordersSlice.actions;
export default ordersSlice.reducer;