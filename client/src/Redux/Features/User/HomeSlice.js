import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api"

export const totalDonors = createAsyncThunk("donor/totalDonors", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalDonors()
        console.log(response);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const totalUnits = createAsyncThunk("user/totalUnits", async (_, { rejectWithValue }) => {
    try {
        console.log('ytresdftyuijhv');
        const response = await api.totalUnits()
        console.log(response);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const totalReceivers = createAsyncThunk("receiver/totalReceivers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalReceivers()
        console.log(response);
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})