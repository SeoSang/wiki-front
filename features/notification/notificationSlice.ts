import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    success : false,
    message : ""
}

export const notificationSlice = createSlice({
    name : "notification",
    initialState : initialState,
    reducers : {
        updateSuccess : ((state)=>{
            state.success = true;
            state.message = "수정이 완료되었습니다.";            
        }),
        updateExpired : ((state)=> {
            state.success= false;
            state.message = "";
        }),
        updateFailed : ((state)=>{
            state.success = false;
            state.message = "수정이 실패하였습니다.";
            console.log(state.success)
        })
    }
})

export const {updateSuccess, updateFailed, updateExpired} = notificationSlice.actions;
export default notificationSlice.reducer;