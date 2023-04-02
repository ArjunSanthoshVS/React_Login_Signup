import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api"

export const requests = createAsyncThunk("admin/requests", async () => {
    try {
        const response = await api.request()
        console.log(response,'resssssssssssssss');
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const approve = createAsyncThunk("admin/approve", async (id) => {
    try {
        console.log(id);
        const response= await api.approve(id)
        return response.data
    } catch (error) {
        console.log('errorrr');
    }
})
export const reject = createAsyncThunk("admin/reject", async (id) => {
    try {
        console.log(id);
        const response= await api.reject(id)
        return response.data
    } catch (error) {
        console.log('errorrr');
    }
})

export const getTransfusion = createAsyncThunk("blood/getTransfusion", async () => {
    try {
        const response = await api.getTransfusion();
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

// const requestsSlice = createSlice({
//     name: 'requests',
//     initialState: { requests: [] },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(approve.fulfilled, (state, action) => {
//                 const index = state.requests.findIndex(request => request._id === action.payload._id);
//                 state.requests[index] = action.payload;
//             });
//     },
// });

// export default requestsSlice.reducer;