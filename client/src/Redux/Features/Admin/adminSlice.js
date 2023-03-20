import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../../api"
import { setUsers } from "./getUsersSlice";

export const adminLogin = createAsyncThunk("admin/login", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await api.adminSignIn(data)
        // navigate('/')
        window.location = "/dashboard"
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const adminSignUp = createAsyncThunk("admin/signup", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await api.adminSignUp(data)
        navigate('/admin_login')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        admin: null,
        error: "",
        loading: false,
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload
        },
        setLogout: (state, action) => {
            state.admin = null
            localStorage.removeItem("adminToken")
        },
        setUserDetails: (state, action) => action.payload,
    },
    extraReducers: {
        [adminLogin.pending]: (state, action) => {
            state.loading = true
        },
        [adminLogin.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminToken", JSON.stringify({ ...action.payload }))
            state.admin = action.payload
        },
        [adminLogin.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [adminSignUp.pending]: (state, action) => {
            state.loading = true
        },
        [adminSignUp.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("adminToken", JSON.stringify({ ...action.payload }))
            state.admin = action.payload
        },
        [adminSignUp.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export const { setAdmin, setLogout, setUserDetails } = adminSlice.actions

export default adminSlice.reducer