import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    literatureCourseData: null as any,
};

// For Literature Course Page
export const literatureCoursePage = createAsyncThunk(
    "literatureCourse/literatureCourse", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/book-store-course");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch Literature Course page data"
            );
        }
    }
);

const literatureCourseSlice = createSlice({
    name: "literatureCourse",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Literature Course Page
        .addCase(literatureCoursePage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(literatureCoursePage.fulfilled, (state, action) => {
            state.loading = false;
            state.literatureCourseData = action.payload;
        })
        .addCase(literatureCoursePage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
});

export default literatureCourseSlice.reducer;