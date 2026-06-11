import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    homeData: null as any,
};

// For Home
export const homePage = createAsyncThunk(
    "home/homePage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/landing");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch home page data"
            );
        }
    }
);

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Home
        .addCase(homePage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(homePage.fulfilled, (state, action) => {
            state.loading = false;
            state.homeData = action.payload;
        })
        .addCase(homePage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default homeSlice.reducer;