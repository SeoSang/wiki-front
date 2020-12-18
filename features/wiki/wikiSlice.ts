import { createSlice } from '@reduxjs/toolkit';
import { loadWiki, updateWiki } from './action';
import { WikiState } from './type';

const NAME ='wiki';

const initialState: WikiState = {
    classfication : [],
    wiki : null,
    isLoadingWiki: false,
    updatingWikiSuccess : false,
}

export const wikiSlice = createSlice({
    name : NAME,
    initialState : initialState,
    reducers :{

    },
    extraReducers :{
        [loadWiki.pending.type] : (state, action)=> {
            state.isLoadingWiki = true;
            state.classfication = null;
        },
        [loadWiki.fulfilled.type] : (state, action)=>{
            state.isLoadingWiki = false;
            state.wiki = action.payload.data.wikiVo;
            state.classfication = action.payload.data.classficationMap;
        },
        [loadWiki.rejected.type] : (state,acion)=> {
            state.isLoadingWiki = false;
            alert('오류 발생! 오류발생!!');
        },
        [updateWiki.pending.type] : (state, action) =>{
            state.updatingWikiSuccess = false;
        },
        [updateWiki.fulfilled.type] : (state, action) =>{
            state.updatingWikiSuccess = true;
            state.wiki = action.payload.data.WikiVo;
            state.classfication?.concat(action.payload.data.classficationMap);
        },
        [updateWiki.rejected.type] : (state, action) => {
            state.updatingWikiSuccess = false;
            alert('오류 발생! 오류발생!!');
        }
    }
})

export default wikiSlice.reducer;