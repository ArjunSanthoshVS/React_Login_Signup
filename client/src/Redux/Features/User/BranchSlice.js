import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
    name: 'branch',
    initialState: [
        { name: 'Ollur', district: 'Thrissur' },
        { name: 'Chalakkudy', district: 'Thrissur' },
        { name: 'Kalamassery', district: 'Ernamkulam' },
        { name: 'Kundannoor', district: 'Ernamkulam' },
    ],
});

export default branchSlice.reducer;