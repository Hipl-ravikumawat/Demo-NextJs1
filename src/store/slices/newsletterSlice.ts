import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
};

export const subscribeNewsletter = createAsyncThunk(
    "newsletter/subscribe", async (values: { email: string }, {rejectWithValue}) => {
        try {
            const response = await api.post("web/newsletter/subscribe", values);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to subscribe"
            );
        }
    }
);

const newsletterSlice = createSlice({
    name: "newsletter",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        // For Footer Newsletter
        .addCase(subscribeNewsletter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(subscribeNewsletter.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(subscribeNewsletter.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default newsletterSlice.reducer;