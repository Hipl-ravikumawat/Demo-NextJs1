import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,

    coursesData: null as any,
    courseDetailData: null as any,
};

// For Courses
export const coursesPage = createAsyncThunk(
    "courses/coursesPage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/course-landing-page");
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch courses page data"
            );
        }
    }
);

// For Course Detail
export const courseDetail = createAsyncThunk(
    "courses/courseDetail", async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`web/course-landing-page/${id}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blog details"
            );
        }
    }
);

const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Courses
        .addCase(coursesPage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(coursesPage.fulfilled, (state, action) => {
            state.loading = false;
            state.coursesData = action.payload;
        })
        .addCase(coursesPage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // For Course Detail
        .addCase(courseDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(courseDetail.fulfilled, (state, action) => {
            state.loading = false;
            //console.log("object", action.payload);
            state.courseDetailData = action.payload;
        })
        .addCase(courseDetail.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default coursesSlice.reducer;