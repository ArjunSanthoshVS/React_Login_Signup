import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../api"

export const paymentDetails = createAsyncThunk("stripe/paymentDetails", async (id, { rejectWithValue }) => {
    try {
        const response = await api.paymentDetails(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})