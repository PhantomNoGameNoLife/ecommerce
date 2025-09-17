import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";
import wishlist from "./wishlistSlice";
import orders from "./ordersSlice";
import payment from "./paymentSlice";
import user from "./userSlice";

export const store = configureStore({
  reducer: {
    cart,
    wishlist,
    orders,
    payment,
    user,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
