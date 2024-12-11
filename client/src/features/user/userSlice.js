import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "../../services/userProfileService";

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getUserProfileService();
      console.log("Response in the thunk of user profile get:", response);
      return response?.Result?.user_data;
    } catch (error) {
      return rejectWithValue(error?.message || "An unexpected error occurred");
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await userServices.updateUserProfileService(updatedData);
      console.log("Response in the thunk of user profile update:", response);
      return response.Result?.user_data;
    } catch (error) {
      return rejectWithValue(error?.message || "An unexpected error occurred");
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling getUserProfile thunk
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log("The action payload is", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;
