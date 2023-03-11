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

const getUsersSlice = createSlice({
    name: 'getUsers',
    initialState: {
        users: [],
    },
    reducers: {
        setUsers: (state, action) => {
            console.log(action.payload,'jkjkj');
            state.users = action.payload;
            console.log(state.users, 'uyutytrt');
        },
    },
});


export const { setUsers } = getUsersSlice.actions;

export default getUsersSlice.reducer;