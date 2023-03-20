import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api"

export const transfusionRequests = createAsyncThunk("receiver/request", async (data, { rejectWithValue }) => {
    try {
        console.log(data, 'popopp');
        const response = await api.request(data)
        console.log(response,'respppp');
        return response.data
    } catch (error) {
        return rejectWithValue("Request failed: " + error.message)
    }
})

export const transfusionHistory = createAsyncThunk("receiver/transfusion_history", async (id, { rejectWithValue }) => {
    try {
        console.log(id);
        const response = await api.transfusionHistory(id)
        console.log(response,'2345678');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const cancelRequest = createAsyncThunk("receiver/cancel", async (id, { rejectWithValue }) => {
    try {
        const response = await api.cancelRequest(id)
        return response.data
    } catch (error) {
        return rejectWithValue(error)        
    }
})


// const TransfusionSlice = createSlice({
//     name: 'transfusion',
//     initialState: {
//         district: '',
//         branch: '',
//         bloodGroup: '',
//         unit: '',
//         reason: '',
//         age: '',
//         receivedDate: '',
//         fullName: '',
//         Gender: '',

//     },
//     reducers: {
//         setTransfuse: (state, action) => {
//             state.transfusion = action.payload
//         }
//     },
// });

// export const { setTransfuse } = TransfusionSlice.actions;
// export default TransfusionSlice.reducer;