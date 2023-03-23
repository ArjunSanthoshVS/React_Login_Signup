import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../api"


// export const newBranch = createAsyncThunk("admin/newBranch", async (newBranchdata, { rejectWithValue }) => {
//     try {
//         console.log(newBranchdata);
//         const response = await api.newBranch(newBranchdata)
//         console.log(response,'hhhhfffffff');
//         return response.data.newBranch
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })
export const newBranch = createAsyncThunk("admin/newBranch", async ({ newBranchdata }, { rejectWithValue }) => {
    try {
        console.log(newBranchdata);
        const response = await api.newBranch(newBranchdata)
        console.log(response, 'hhhhfffffff');
        if (response.status >= 400) {
            throw new Error(response.data);
        }
        return response.data;
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
            console.log('errorrr adichuuuu');
            throw new Error('A branch with the same address already exists.');
        }
        throw error;
    }
}
);

export const branchDetails = createAsyncThunk("admin/branches", async () => {
    try {
        console.log('sliceeeeeee');
        const response = await api.branches()
        return response.data
    } catch (error) {
        console.log(error);
    }
})


export const editBranch = createAsyncThunk("admin/editBranch", async ({ selectedBranch, district, branch, address, phone }) => {
    const data = { selectedBranch, district, branch, address, phone }
    console.log(data, 'sleee');
    try {
        const response = await api.editBranch(data)
        console.log(response.data, 'kjhgfdfghj');
        if (response.status >= 400) {
            throw new Error('A branch with the same address already exists.');
        }
        return response.data
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
            console.log('errorrr adichuuuu');
            throw new Error('A branch with the same address already exists.');
        }
        throw error;
    }
})
export const removeBranch = createAsyncThunk("admin/removeBranch", async (id) => {
    console.log(id, 'sleee');
    try {
        const response = await api.removeBranch(id)
        console.log(response.data,'kjhgfdfghj');
        return response.data
    } catch (error) {
        console.log(error);
    }
})