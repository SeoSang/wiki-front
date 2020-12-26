import { createSlice } from '@reduxjs/toolkit';
import { loadWiki, updateWiki } from './action';
import { WikiState } from './type';

const NAME ='wiki';

const initialState: WikiState = {
    classification : [],
    wiki : null,
    isLoadingWiki: false,
    updatingWikiSuccess : false,
    wikiSubject : null,
}

export const wikiSlice = createSlice({
    name : NAME,
    initialState : initialState,
    reducers :{

    },
    extraReducers :{
        [loadWiki.pending.type] : (state, action)=> {
            state.isLoadingWiki = true;
            state.classification = null;
        },
        [loadWiki.fulfilled.type] : (state, action)=>{            
            state.isLoadingWiki = false;
            state.wiki = action.payload.data.wikiVO;
            state.classification = action.payload.data.classificationList;
            state.wikiSubject = action.payload.data.subjectVO;
        },
        [loadWiki.rejected.type] : (state,acion)=> {
            state.isLoadingWiki = false;
            alert('오류 발생! 오류발생!!');
        },
        [updateWiki.pending.type] : (state, action) =>{
            state.updatingWikiSuccess = false;
        },
        [updateWiki.fulfilled.type] : (state, action) =>{
            console.log(action.payload.data);
            state.updatingWikiSuccess = true;
            state.wiki = action.payload.data.wikiVO;
            state.classification?.concat(action.payload.data.classificationList);
        },
        [updateWiki.rejected.type] : (state, action) => {
            state.updatingWikiSuccess = false;
            alert('오류 발생! 오류발생!!');
        }
    }
})

export default wikiSlice.reducer;