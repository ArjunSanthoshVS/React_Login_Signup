import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api"

export const donate = createAsyncThunk("donor/donate", async (data, { rejectWithValue }) => {
    try {
        console.log(data, 'popopp');
        const response = await api.donate(data)
        return response.data
    } catch (error) {
        return rejectWithValue("Donation failed: " + error.message)
    }
})

export const donationHistory = createAsyncThunk("donor/donation_history", async (id, { rejectWithValue }) => {
    try {
        console.log(id);
        const response = await api.donationHistory(id)
        console.log(response.data,'2345678');
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

// const donateSlice = createSlice({
//     name: 'donate',
//     initialState: {
//         district: '',
//         branch: '',
//         bloodGroup: '',
//         unit: '',
//         disease: '',
//         age: '',
//         donatedDate: '',
//         fullName: '',
//         Gender: '',
//     },
//     reducers: {
//         setDonate: (state, action) => {
//             state.donate = action.payload
//         }
//     },
// });

// export const { setDonate } = donateSlice.actions;
// export default donateSlice.reducer;