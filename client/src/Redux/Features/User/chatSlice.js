import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../api"

export const allContacts = createAsyncThunk("chat/allContacts", async (id, { rejectWithValue }) => {
    try {
        const response = await api.allContacts(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const addMessage = createAsyncThunk("chat/addMessage", async (data, { rejectWithValue }) => {
    try {
        const response = await api.addMessage(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getAllMessage = createAsyncThunk("chat/getAllMessage", async (data, { rejectWithValue }) => {
    try {
        const response = await api.getAllMessage(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})