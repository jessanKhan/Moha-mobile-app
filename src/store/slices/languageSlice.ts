import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
    mode: 'bn' | 'en';
}

const initialState: LanguageState = {
    mode: 'bn', // Default to Bangla
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        toggleLanguage: (state) => {
            state.mode = state.mode === 'bn' ? 'en' : 'bn';
        },
        setLanguage: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
