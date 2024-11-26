import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

// Async thunks for login, signup, and logout
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      console.log("This is the response in the logiun userslice", response);
      return response;
    } catch (error) {
      console.log("This is the error in the logiun userslice", error);
      return rejectWithValue(error || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Reached the checkAuth");
      const response = await authService.checkAuth();
      console.log("The response in the checkAuth is", response);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Authentication check failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      console.log("The reponse while logging out is", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh_token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.refreshAccessTokenService();
      console.log("The response while refreshing token is", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to refresh token");
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("The action payload in the login is", action.payload);
        state.isAuthenticated = true;
        state.user = action.payload.IsSuccess
          ? action.payload.Result?.user_data
          : null;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Handling checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("The action payload in the check atuh", action.payload);
        state.isAuthenticated = action.payload.IsSuccess;
        state.user = action.payload.IsSuccess
          ? action.payload.Result?.user_data
          : null;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("The action payload in the check auth isd", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Handling logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
