import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    searchPageData: null as any,
    searchResults: [] as any[],
    isSearchPerformed: false,
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

// For Search Courses
export const searchCourses = createAsyncThunk(
    "search/searchCourses", async (payload: any, { rejectWithValue }) => {
        try {
            const response = await api.post("web/course-marketplace/search", payload);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to search courses"
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
        })

        // For Search Courses
        .addCase(searchCourses.pending, (state) => {
            state.loading = true;
            state.isSearchPerformed = true;
        })
        .addCase(searchCourses.fulfilled, (state, action) => {
            state.loading = false;
            state.searchResults = action.payload;
            state.isSearchPerformed = true;
        })
        .addCase(searchCourses.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export default searchPageSlice.reducer;