import { createSlice } from '@reduxjs/toolkit';

const districtSlice = createSlice({
    name: 'district',
    initialState: {
        selectedDistrict: null
    },
    reducers: {
        selectDistrict: (state, action) => {
            state.selectedDistrict = action.payload;
        }
    }
});

export const { selectDistrict } = districtSlice.actions;
export default districtSlice.reducer;