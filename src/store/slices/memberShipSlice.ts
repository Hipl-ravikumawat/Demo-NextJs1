import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    memberShipData: null as any,
};

// For Membership
export const memberShipPage = createAsyncThunk(
    "membership/memberShipPage", async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("web/memberships");
            return response.data;

        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch membership page data"
            );
        }
    }
);

const memberShipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: { },

    extraReducers: (builder) => {
        builder
        // For Membership
        .addCase(memberShipPage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(memberShipPage.fulfilled, (state, action) => {
            state.loading = false;
            state.memberShipData = action.payload;
        })
        .addCase(memberShipPage.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default memberShipSlice.reducer;