import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

interface AuthState {
    loading: boolean;
    user: any;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    loading: false,
    user: null,
    token: null,
    error: null,
};

// For Login
export const loginUser = createAsyncThunk(
    "auth/login", async (data: any, thunkAPI) => {
        try {
            const response = await api.post("web/auth/login", data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// For Register
export const registerUser = createAsyncThunk(
    "auth/register", async (data: any, thunkAPI) => {
        try {
            const response = await api.post("web/auth/register", data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// For Forgot Password
export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword", async (data: { email: string }, thunkAPI) => {
        try {
            const response = await api.post("web/auth/forgot-password", data);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to send reset link"
            );
        }
    }
);

// For Reset Password
export const resetPassword = createAsyncThunk(
    "auth/resetPassword", async (
        { token, password, } : {
            token: string;
            password: string;
        },
        thunkAPI) => {
        try {
            const response = await api.post(`web/auth/reset-password/${token}`, {password,});
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Password reset failed");
        }
    }
);

// For Logout
export const logoutUser = createAsyncThunk(
    "auth/logoutUser", async (_, thunkAPI) => {
        try {
            const response = await api.post("web/auth/logout");
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder
        // For Login
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        })
        .addCase(loginUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // For Register
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(registerUser.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // For Forgot Password
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(forgotPassword.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // For Reset Password
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(resetPassword.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;