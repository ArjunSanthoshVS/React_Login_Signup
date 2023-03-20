import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api"

export const approveDonation = createAsyncThunk("admin/approveDonation", async (id) => {
    try {
        console.log(id);
        const response = await api.approveDonation(id)
        return response.data
    } catch (error) {
        console.log('errorrr');
    }
})
export const rejectDonation = createAsyncThunk("admin/rejectDonation", async (id) => {
    try {
        console.log(id);
        const response = await api.rejectDonation(id)
        return response.data
    } catch (error) {
        console.log('errorrr');
    }
})

const requestsSlice = createSlice({
    name: 'requests',
    initialState: { requests: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(approveDonation.fulfilled, (state, action) => {
                const index = state.donations.findIndex(donation => donation._id === action.payload._id);
                state.donation[index] = action.payload;
            });
    },
});