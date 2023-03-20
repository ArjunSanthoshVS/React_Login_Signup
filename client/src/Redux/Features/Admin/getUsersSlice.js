import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api"


export const fetchUsers = createAsyncThunk("admin/users", async (_, { dispatch }) => {
    console.log('eeeee');
    try {
        const response = await api.fetchUsers()
        const data = await response.data
        console.log(data, '[[[[');
        dispatch(setUsers(data))
    } catch (error) {
        console.log(error);
    }
})

export const donorDetails = createAsyncThunk("admin/donations", async () => {
    try {
        const response = await api.donations()
        console.log(response,'23wedtg');
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const userDonations = createAsyncThunk("admin/userDonations", async (id) => {
    try {
        console.log(id,'7788888');
        const response = await api.userDonations(id)
        console.log(response,'23wedtg');
        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const requests = createAsyncThunk("admin/requests", async () => {
    try {
        console.log('mmmmmm');
        const response = await api.requests()
        console.log(response, 'resssssssssssssss');
        return response.data;
    } catch (error) {
        console.log(error);
    }
})
export const userRequests = createAsyncThunk("admin/userRequests", async (id) => {
    try {
        console.log(id, '7788888');
        const response = await api.userRequests(id)
        console.log(response, '23wedtg');
        return response.data
    } catch (error) {
        console.log(error);
    }
})


const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState: {
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            console.log(action.payload, 'jkjkj');
            state.users = action.payload;
            console.log(state.users, 'uyutytrt');
        },
    },
});


export const { setUsers } = getUsersSlice.actions;

export default getUsersSlice.reducer;