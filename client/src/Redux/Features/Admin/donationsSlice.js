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

export const getAvailableUnits = createAsyncThunk("blood/getAvailableUnits", async () => {
    try {
        const response = await api.getAvailableUnits();
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const getDonations = createAsyncThunk("blood/getDonations", async () => {
    try {
        const response = await api.getDonations();
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// const requestsSlice = createSlice({
//     name: 'requests',
//     initialState: { requests: [] },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(approveDonation.fulfilled, (state, action) => {
//                 const index = state.donations.findIndex(donation => donation._id === action.payload._id);
//                 state.donation[index] = action.payload;
//             });
//     },
// });