import { createSlice } from '@reduxjs/toolkit';
import { boardContentInfo } from './type'

export const boardState : boardContentInfo = {
    updatedPostId : 0
}

export const boardSlice = createSlice({
    name : 'board',
    initialState : boardState,
    reducers : {
        updatePostId : (state, action) => {            
            return {
                updatedPostId : state.updatedPostId + action.payload
            }
        }
    }
})

export const { updatePostId } = boardSlice.actions;