import { createAsyncThunk } from "@reduxjs/toolkit"
import * as api from "../../api"

export const allDistricts = createAsyncThunk("user/allDistricts", async (_, { rejectWithValue }) => {
    try {
        const districts = await api.allDistricts()
        return districts.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const districtChoose = createAsyncThunk("user/districtChoose", async (selectedDistrict, { rejectWithValue }) => {
    try {
        const district = await api.districtChoose(selectedDistrict.district)
        return district.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})