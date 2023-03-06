import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as api from "../api"
export const login = createAsyncThunk("user/login", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await api.signIn(data)
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const signUp = createAsyncThunk("user/signup", async ({ data, navigate }, { rejectWithValue }) => {
    try {
        console.log(data);
        const response = await api.signUp(data)
        navigate('/login')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        error: "",
        loading: false,
    }, extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userToken", JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [signUp.pending]: (state, action) => {
            state.loading = true
        },
        [signUp.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("userToken", JSON.stringify({ ...action.payload }))
            state.user = action.payload
        },
        [signUp.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        }
    }
})

export default userSlice.reducer