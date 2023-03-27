import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../api"

export const availableUnits = createAsyncThunk("admin/units", async (_, { rejectWithValues }) => {
    try {
        const response = await api.units();
        console.log(response.data);
        return response.data; // Return the response from the API call
    } catch (error) {
        console.log(error);
        return rejectWithValues(error); // Return the error using the rejectWithValues helper function
    }
});