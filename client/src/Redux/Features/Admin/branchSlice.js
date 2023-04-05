import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../api"

export const newBranch = createAsyncThunk("admin/newBranch", async ({ newBranchdata }, { rejectWithValue }) => {
    try {
        const response = await api.newBranch(newBranchdata)
        if (response.status >= 400) {
            throw new Error(response.data);
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('A branch with the same address already exists.');
        }
        throw error;
    }
});

export const branchDetails = createAsyncThunk("admin/branches", async () => {
    try {
        const response = await api.branches()
        return response.data
    } catch (error) {
        throw error
    }
})


export const editBranch = createAsyncThunk("admin/editBranch", async ({ selectedBranch, district, branch, address, phone }) => {
    const data = { selectedBranch, district, branch, address, phone }
    try {
        const response = await api.editBranch(data)
        if (response.status >= 400) {
            throw new Error('A branch with the same address already exists.');
        }
        return response.data
    } catch (error) {
        if (error.response && error.response.status === 409) {
            throw new Error('A branch with the same address already exists.');
        }
        throw error;
    }
})
export const removeBranch = createAsyncThunk("admin/removeBranch", async (id) => {
    try {
        const response = await api.removeBranch(id)
        return response.data
    } catch (error) {
        throw error
    }
})