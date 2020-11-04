import { createSlice } from '@reduxjs/toolkit';

interface initialState {
    start :number,
    end : number,
    current:number
}

export const pageSlice = createSlice ({
    name : 'page',
    initialState :{
        start : 0,
        end : 5,
        current : 1,
    } as initialState,
    reducers :{
        updateCurrentPage : (state, action) =>{            
            return {
                ...state,
                current:action.payload,
            }
        },
        updateStartEndPage : (state, action) =>{
            return {
                ...state,
                start : action.payload.start,
                end : action.payload.end
            }
        },
    }
});

export const {updateCurrentPage, updateStartEndPage} = pageSlice.actions;

