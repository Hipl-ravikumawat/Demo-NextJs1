import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api/axios";

const initialState = {
    loading: false,
    error: null as string | null,
    meetingData: null as any,
};

// Generate Meeting Token
export const generateMeetingToken = createAsyncThunk(
    "meeting/generateMeetingToken", async ({channelName, uid}: {
            channelName: string;
            uid: number;
        }, { rejectWithValue }) => {
        try {
            const response = await api.post("meeting/generate-token", {channelName, uid});
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to generate meeting token"
            );
        }
    }
);

const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(generateMeetingToken.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(generateMeetingToken.fulfilled, (state, action) => {
            state.loading = false;
            state.meetingData = action.payload;
        })
        .addCase(generateMeetingToken.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default meetingSlice.reducer;