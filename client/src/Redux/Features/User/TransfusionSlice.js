import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api"

export const transfusionRequests = createAsyncThunk("receiver/request", async (data, { rejectWithValue }) => {
    try {
        const response = await api.request(data)
        return response.data
    } catch (error) {
        return rejectWithValue("Request failed: " + error.message)
    }
})

export const transfusionHistory = createAsyncThunk("receiver/transfusion_history", async (id, { rejectWithValue }) => {
    try {
        const response = await api.transfusionHistory(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const cancelRequest = createAsyncThunk("receiver/cancel", async (id, { rejectWithValue }) => {
    try {
        const response = await api.cancelRequest(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error)        
    }
})