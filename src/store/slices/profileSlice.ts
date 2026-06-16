import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,

    profileData: null as any,
};

// For Profile
export const profilePage = createAsyncThunk(
    "profile/profilePage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/auth/profile");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blog page data"
            );
        }
    }
);

// For Profile Update
export const updateProfile = createAsyncThunk(
    "profile/updateProfile", async (values: { username: string; email: string; }, { rejectWithValue }) => {
        try {
            const response = await api.patch("web/auth/profile", values);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update profile"
            );
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Profile
        .addCase(profilePage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(profilePage.fulfilled, (state, action) => {
            state.loading = false;
            state.profileData = action.payload;
        })
        .addCase(profilePage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // For Profile Upadte
        .addCase(updateProfile.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.profileData = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export default profileSlice.reducer;