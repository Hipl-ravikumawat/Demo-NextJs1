import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,

    blogData: null as any,
    blogDetailData: null as any,
};

// For Blog
export const blogPage = createAsyncThunk(
    "blog/blogPage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/blogs");
            //console.log("response", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blog page data"
            );
        }
    }
);

// For Blog-Detail
export const blogDetail = createAsyncThunk(
    "blog/blogDetail", async (id: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`web/blogs/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch blog details"
            );
        }
    }
);

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Blog Listing
        .addCase(blogPage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(blogPage.fulfilled, (state, action) => {
            state.loading = false;
            state.blogData = action.payload;
        })
        .addCase(blogPage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        })

        // For Blog Detail
        .addCase(blogDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(blogDetail.fulfilled, (state, action) => {
            //console.log("object", action.payload)
            state.loading = false;
            state.blogDetailData = action.payload;
        })
        .addCase(blogDetail.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default blogSlice.reducer;