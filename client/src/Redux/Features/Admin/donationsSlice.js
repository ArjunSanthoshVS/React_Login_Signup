import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api"

export const approveDonation = createAsyncThunk("admin/approveDonation", async (id) => {
    try {
        const response = await api.approveDonation(id)
        return response.data
    } catch (error) {
        throw (error);
    }
})
export const rejectDonation = createAsyncThunk("admin/rejectDonation", async (id) => {
    try {
        const response = await api.rejectDonation(id)
        return response.data
    } catch (error) {
        throw (error);
    }
})

export const getAvailableUnits = createAsyncThunk("blood/getAvailableUnits", async () => {
    try {
        const response = await api.getAvailableUnits();
        return response.data;
    } catch (error) {
        throw (error);
    }
});

export const getDonations = createAsyncThunk("blood/getDonations", async () => {
    try {
        const response = await api.getDonations();
        return response.data;
    } catch (error) {
        throw (error);
    }
});
