import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../api"

export const fullPaymentDetails = createAsyncThunk("stripe/fullPaymentDetails", async (_, { rejectwithvalue }) => {
    try {
        const response = await api.fullPaymentDetails()
        return response.data
    } catch (error) {
        return rejectwithvalue(error.response.data)
    }
})
