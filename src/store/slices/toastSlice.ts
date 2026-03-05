import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
    visible: boolean;
    message: string;
    type: ToastType;
}

const initialState: ToastState = {
    visible: false,
    message: '',
    type: 'success',
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<{ message: string; type?: ToastType }>) => {
            state.visible = true;
            state.message = action.payload.message;
            state.type = action.payload.type || 'success';
        },
        hideToast: (state) => {
            state.visible = false;
        },
    },
});

export const { showToast, hideToast } = toastSlice.actions;
export default toastSlice.reducer;
