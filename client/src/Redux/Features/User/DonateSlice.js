import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api"

export const donate = createAsyncThunk("donor/donate", async (data, { rejectWithValue }) => {
    try {
        const response = await api.donate(data)
        return response.data
    } catch (error) {
        return rejectWithValue("Donation failed: " + error.message)
    }
})

export const donationHistory = createAsyncThunk("donor/donation_history", async (id, { rejectWithValue }) => {
    try {
        const response = await api.donationHistory(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const pateintDetails = createAsyncThunk("donor/pateintDetails", async (_, { rejectWithValue }) => {
    try {
        const response = await api.pateintDetails()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const transfusionDistricts = createAsyncThunk("donor/transfusionDistricts", async (_, { rejectWithValue }) => {
    try {
        const response = await api.transfusionDistricts()
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getBranches = createAsyncThunk("donor/getBranches", async (value, { rejectWithValue }) => {
    try {
        const district = await api.getBranches(value)
        return district.data.branchNames
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
