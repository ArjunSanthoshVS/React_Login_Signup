import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../../api"

export const requests = createAsyncThunk("admin/requests", async () => {
    try {
        const response = await api.request()
        return response.data;
    } catch (error) {
        throw (error);
    }
})

export const approve = createAsyncThunk("admin/approve", async (id) => {
    try {
        const response = await api.approve(id)
        return response.data
    } catch (error) {
        throw (error)
    }
})
export const reject = createAsyncThunk("admin/reject", async (id) => {
    try {
        const response = await api.reject(id)
        return response.data
    } catch (error) {
        throw (error)
    }
})

export const getTransfusion = createAsyncThunk("blood/getTransfusion", async () => {
    try {
        const response = await api.getTransfusion();
        return response.data;
    } catch (error) {
        throw(error);
    }
});
