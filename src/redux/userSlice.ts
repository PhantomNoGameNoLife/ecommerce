import { UserData } from "@/types/userData.t";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUser } from "@/apis/userApi";

const initialState: {
  data: UserData | null;
  userLoading: boolean;
  userError?: string | null;
  userSuccess?: string | null;
} = {
  data: null,
  userLoading: true,
  userError: null,
  userSuccess: null,
};

// Get User Data
export const fetchUser = createAsyncThunk<UserData>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await GetUser();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserStatus: (state) => {
      state.userError = null;
      state.userSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.userSuccess = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
      });
  },
});

export const { resetUserStatus } = userSlice.actions;
export default userSlice.reducer;
