import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    searchPageData: null as any,
};

// For Search Page
export const searchPage = createAsyncThunk(
    "search/searchPage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/course-marketplace");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch marketplace page data"
            );
        }
    }
);

const searchPageSlice = createSlice({
    name: "search",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Search Page
        .addCase(searchPage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(searchPage.fulfilled, (state, action) => {
            state.loading = false;
            state.searchPageData = action.payload;
        })
        .addCase(searchPage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default searchPageSlice.reducer;