import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api"

export const totalDonors = createAsyncThunk("donor/totalDonors", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalDonors()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const totalUnits = createAsyncThunk("user/totalUnits", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalUnits()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const totalReceivers = createAsyncThunk("receiver/totalReceivers", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalReceivers()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const sameBloodGroup = createAsyncThunk("receiver/sameBloodGroup", async (data, { rejectWithValue }) => {
    try {
        const response = await api.sameBloodGroup(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const otherBloodGroup = createAsyncThunk("receiver/otherBloodGroup", async (data, { rejectWithValue }) => {
    try {
        const response = await api.otherBloodGroup(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const totalRequests = createAsyncThunk("receiver/totalRequests", async (_, { rejectWithValue }) => {
    try {
        const response = await api.totalRequests()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const pendingRequests = createAsyncThunk("receiver/pendingRequests", async (_, { rejectWithValue }) => {
    try {
        const response = await api.pendingRequests()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const approvedRequests = createAsyncThunk("receiver/approvedRequests", async (_, { rejectWithValue }) => {
    try {
        const response = await api.approvedRequests()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const rejectedRequests = createAsyncThunk("receiver/rejectedRequests", async (_, { rejectWithValue }) => {
    try {
        const response = await api.rejectedRequests()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

