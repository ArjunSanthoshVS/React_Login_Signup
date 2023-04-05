import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"


export const fetchUsers = createAsyncThunk("admin/users", async (_, { dispatch }) => {
    try {
        const response = await api.fetchUsers()
        const data = await response.data
        dispatch(setUsers(data))
    } catch (error) {
        throw(error);
    }
})

export const donorDetails = createAsyncThunk("admin/donations", async () => {
    try {
        const response = await api.donations()
        return response.data
    } catch (error) {
        throw(error);
    }
})

export const userDonations = createAsyncThunk("admin/userDonations", async (id) => {
    try {
        const response = await api.userDonations(id)
        return response.data
    } catch (error) {
        throw(error);
    }
})

export const requests = createAsyncThunk("admin/requests", async () => {
    try {
        const response = await api.requests()
        return response.data;
    } catch (error) {
        throw(error);
    }
})
export const userRequests = createAsyncThunk("admin/userRequests", async (id) => {
    try {
        const response = await api.userRequests(id)
        return response.data
    } catch (error) {
        throw(error);
    }
})


const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState: {
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
});


export const { setUsers } = getUsersSlice.actions;

export default getUsersSlice.reducer;