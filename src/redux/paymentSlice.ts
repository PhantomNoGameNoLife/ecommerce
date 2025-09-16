import { CheckoutSession, CreateCashOrder } from "@/apis/ordersApi";
import { Online, Payment, PaymentRequest } from "@/types/payment.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const emptyPayment = (): Payment => ({
  status: "",
  data: {} as Payment["data"],
});

const initialState: Payment & {
  paymentLoading: boolean;
  paymentError?: string | null;
  paymentSuccess?: string | null;
  url? : string | null;
} = {
  ...emptyPayment(),
  paymentLoading: false,
  paymentError: null,
  paymentSuccess: null,
  url : null,
};

// Create Cash Order
export const cashOrder = createAsyncThunk<
  Payment,
  { id: string; values: PaymentRequest }
>("payment/cashOrder", async ({ id, values }, { rejectWithValue }) => {
  try {
    const data = await CreateCashOrder(id, values);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Something went wrong");
  }
});

// Checkout Session
export const checkoutSession = createAsyncThunk<
  Online,
  { id: string; values: PaymentRequest }
>("payment/checkoutSession", async ({ id, values }, { rejectWithValue }) => {
  try {
    const data = await CheckoutSession(id, values);
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Something went wrong");
  }
});

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentClearStatus: (state) => {
      state.paymentError = null;
      state.paymentSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Cash Order
      .addCase(cashOrder.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentSuccess = null;
      })
      .addCase(cashOrder.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.paymentSuccess = "Cash order created successfully";
      })
      .addCase(cashOrder.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      })

      // Checkout Session
      .addCase(checkoutSession.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentSuccess = null;
      })
      .addCase(checkoutSession.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.status = action.payload.status;
        state.url = action.payload.session.url;
        state.paymentSuccess = "Checkout session created successfully";
      })
      .addCase(checkoutSession.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload as string;
      });
  },
});

export const { paymentClearStatus } = paymentSlice.actions;
export default paymentSlice.reducer;