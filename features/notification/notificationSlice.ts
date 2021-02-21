import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    success : false,
    message : ""
}

export const notificationSlice = createSlice({
    name : "notification",
    initialState : initialState,
    reducers : {
        notificateSuccess : ((state, action)=>{
            state.success = true;
            state.message = action.payload.message;
        }),
        notificateExpired : ((state)=> {
            state.success= false;
            state.message = "";
        }),
        notificateFailed : ((state, action)=>{
            state.success = false;
            state.message = action.payload.message;
            console.log(state.success)
        })
    }
})

export const {notificateSuccess, notificateFailed, notificateExpired} = notificationSlice.actions;
export default notificationSlice.reducer;